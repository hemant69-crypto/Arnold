import "server-only";
import type {
  Enquiry,
  EnquiryProvider,
  EnquiryStore,
  Reservation,
} from "./enquiry";
const reserveScript = `
local prior=redis.call('GET',KEYS[1])
if prior then
 local p=cjson.decode(prior)
 if p.digest~=ARGV[1] then return 'conflict' end
 if p.state=='accepted' then return 'accepted' end
 if tonumber(ARGV[2])-p.time<90 then return 'pending' end
end
local count=redis.call('INCR',KEYS[2])
if count==1 then redis.call('EXPIRE',KEYS[2],600) end
if count>5 then return 'blocked' end
local global=redis.call('INCR',KEYS[3])
if global==1 then redis.call('EXPIRE',KEYS[3],86400) end
if global>500 then return 'blocked' end
redis.call('SET',KEYS[1],cjson.encode({digest=ARGV[1],state='pending',time=tonumber(ARGV[2])}),'EX',86400)
return 'reserved'`;
const acceptScript = `local prior=redis.call('GET',KEYS[1]); if not prior then return 0 end; local p=cjson.decode(prior); if p.digest~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],cjson.encode({digest=p.digest,state='accepted',time=p.time}),'EX',86400); return 1`;
export class RedisEnquiryStore implements EnquiryStore {
  constructor(
    private endpoint: string,
    private token: string,
  ) {
    const url = new URL(endpoint);
    if (
      url.protocol !== "https:" ||
      !url.hostname.endsWith(".upstash.io") ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search
    )
      throw new Error("Invalid limiter configuration");
  }
  private async command(command: (string | number)[]) {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("limiter-unavailable");
    const body = await response.json();
    if (body.error) throw new Error("limiter-unavailable");
    return body.result;
  }
  async reserve(
    id: string,
    payload: string,
    rateKey: string,
  ): Promise<Reservation> {
    const result = await this.command([
      "EVAL",
      reserveScript,
      3,
      `arnold:enquiry:${id}`,
      `arnold:rate:${rateKey}`,
      `arnold:global:${Math.floor(Date.now() / 86400000)}`,
      payload,
      Math.floor(Date.now() / 1000),
    ]);
    if (
      !["reserved", "accepted", "pending", "blocked", "conflict"].includes(
        result,
      )
    )
      throw new Error("limiter-unavailable");
    return result;
  }
  async accept(id: string, payload: string) {
    if (
      (await this.command([
        "EVAL",
        acceptScript,
        1,
        `arnold:enquiry:${id}`,
        payload,
      ])) !== 1
    )
      throw new Error("status-unavailable");
  }
}
export class ResendProvider implements EnquiryProvider {
  constructor(
    private key: string,
    private to: string,
    private from: string,
  ) {
    const safe = /^[^\s@\r\n<>]+@[^\s@\r\n<>]+\.[^\s@\r\n<>]+$/;
    if (!safe.test(to) || !safe.test(from))
      throw new Error("Invalid delivery configuration");
  }
  async send(enquiry: Enquiry): Promise<"accepted" | "rejected" | "unknown"> {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.key}`,
          "Content-Type": "application/json",
          "Idempotency-Key": enquiry.requestId,
        },
        body: JSON.stringify({
          from: this.from,
          to: [this.to],
          reply_to: enquiry.email,
          subject: "Arnold website business enquiry",
          text: `Name: ${enquiry.name}\nCompany: ${enquiry.company}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone || "Not supplied"}\nInterest: ${enquiry.interest}\n\n${enquiry.message}`,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return response.status < 500 ? "rejected" : "unknown";
      const body = await response.json();
      return typeof body.id === "string" ? "accepted" : "unknown";
    } catch {
      return "unknown";
    }
  }
}
