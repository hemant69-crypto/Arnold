import type { Metadata } from "next";
import { EmailSignatureGenerator } from "@/components/EmailSignatureGenerator";
import { productionOrigin } from "@/lib/site-config";
import "./signature.css";

// This utility intentionally stays outside the public content/route registry.
export const metadata: Metadata = {
  title: "Create your email signature",
  description:
    "Create your Arnold Consulting email signature and add it to Gmail.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function EmailSignaturePage() {
  return (
    <EmailSignatureGenerator
      assetOrigin={productionOrigin ?? "https://armold.netlify.app"}
    />
  );
}
