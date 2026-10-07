import { randomUUID } from "node:crypto";
import { Contact } from "@/components/SitePages";
import { inquiryEnabled } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Discuss your business needs",
  "Start a conversation about leadership, specialist talent, recruitment capacity or people capability.",
  "/contact",
);
export const dynamic = "force-dynamic";
export default function ContactPage() {
  return <Contact enabled={inquiryEnabled} requestId={randomUUID()} />;
}
