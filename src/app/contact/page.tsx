import { randomUUID } from "node:crypto";
import { Contact } from "@/components/SitePages";
import { inquiryEnabled } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Discuss a business priority",
  "Discuss business consulting for your next stage, or a defined leadership, talent, GCC or workforce requirement.",
  "/contact",
);
export const dynamic = "force-dynamic";
export default function ContactPage() {
  return <Contact enabled={inquiryEnabled} requestId={randomUUID()} />;
}
