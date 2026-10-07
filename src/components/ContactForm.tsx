"use client";
import { SiteLink as Link } from "./SiteLink";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./LinkButton";
import { interests } from "@/lib/interests";
export function ContactForm({
  enabled,
  requestId,
}: {
  enabled: boolean;
  requestId: string;
}) {
  const select = useRef<HTMLSelectElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    const value = new URLSearchParams(location.search).get("interest");
    if (value && interests.some(([id]) => id === value) && select.current)
      select.current.value = value;
  }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    if (!enabled) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setErrors({});
    setMessage("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "same-origin",
      });
      const result = await response.json();
      if (response.ok && result.accepted === true) {
        location.assign("/thank-you");
        return;
      }
      setErrors(result.errors ?? {});
      setMessage(
        result.message ??
          "Your enquiry has not been confirmed. Please try again later.",
      );
    } catch {
      setMessage(
        "We could not confirm whether your enquiry was accepted. Keep this page open and retry later using the same form.",
      );
    } finally {
      setPending(false);
      requestAnimationFrame(() => status.current?.focus());
    }
  }
  const field = (
    name: string,
    label: string,
    type = "text",
    required = true,
    autoComplete?: string,
  ) => (
    <label htmlFor={name}>
      {label}
      {required ? "" : " (optional)"}
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={name === "email" ? 254 : 120}
        autoComplete={autoComplete}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] ? <span id={`${name}-error`}>{errors[name]}</span> : null}
    </label>
  );
  return (
    <form
      className="contact-form"
      action="/api/enquiry"
      method="post"
      onSubmit={submit}
    >
      {!enabled ? (
        <div className="notice">
          <h3>Online enquiries are being connected.</h3>
          <p>
            This preview form cannot send a message yet. No enquiry will be
            submitted until Arnold’s delivery channel is configured and
            verified.
          </p>
        </div>
      ) : null}
      <input type="hidden" name="requestId" value={requestId} />
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-row">
        {field("name", "Your name", "text", true, "name")}
        {field("email", "Email for follow-up", "email", true, "email")}
      </div>
      <div className="form-row">
        {field("company", "Company", "text", true, "organization")}
        {field("phone", "Phone", "tel", false, "tel")}
      </div>
      <label htmlFor="interest">
        What would you like to discuss?
        <select
          name="interest"
          id="interest"
          ref={select}
          defaultValue="not-sure"
        >
          {interests.map(([id, label]) => (
            <option value={id} key={id}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="message">
        What business priority or people challenge would you like to discuss?
        <textarea
          name="message"
          id="message"
          required
          maxLength={3000}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
        />
        {errors.message ? (
          <span id="message-error">{errors.message}</span>
        ) : null}
        <span className="form-help" id="message-help">
          A short outline is enough. Please do not include CVs, sensitive
          personal information or confidential candidate records.
        </span>
      </label>
      <p className="form-help">
        We use your details to consider and respond to this enquiry. Read the{" "}
        <Link href="/privacy">privacy notice</Link>. This does not subscribe you
        to marketing.
      </p>
      {message ? (
        <div className="form-status" role="status" tabIndex={-1} ref={status}>
          {message}
        </div>
      ) : null}
      <button
        type="submit"
        className="link-button"
        disabled={!enabled || pending}
      >
        {pending
          ? "Sending enquiry…"
          : enabled
            ? "Send business enquiry"
            : "Sending unavailable in preview"}
        <Arrow />
      </button>
      <noscript>
        <p className="form-help">
          When enabled, this form also supports submission without JavaScript.
        </p>
      </noscript>
    </form>
  );
}
