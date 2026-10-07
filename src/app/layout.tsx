import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";
import "./motion.css";
import "./content-enhancement.css";
import { company } from "@/content/company";
import { publicReleaseEnabled, productionOrigin } from "@/lib/site-config";
import { contentPaths, getContent } from "@/lib/content";
const manrope = localFont({
  src: "../../public/fonts/manrope.woff2",
  display: "swap",
  variable: "--font-manrope",
});
export const metadata: Metadata = {
  title: {
    default: "Arnold Consulting | Business ambition. People to make it happen.",
    template: "%s | Arnold Consulting",
  },
  description: company.description,
  robots: { index: publicReleaseEnabled, follow: publicReleaseEnabled },
  ...(productionOrigin ? { metadataBase: new URL(productionOrigin) } : {}),
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  const available = content.services.map((s) => s.slug);
  const paths = contentPaths(content);
  return (
    <html lang="en" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        {publicReleaseEnabled && productionOrigin && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": productionOrigin + "/#organization",
                    name: "Arnold Consulting",
                    description: company.description,
                    url: productionOrigin,
                    sameAs: [company.linkedin],
                  },
                  {
                    "@type": "WebSite",
                    "@id": productionOrigin + "/#website",
                    name: "Arnold Consulting",
                    url: productionOrigin,
                    publisher: { "@id": productionOrigin + "/#organization" },
                    inLanguage: "en",
                  },
                ],
              }).replace(/</g, "\\u003c"),
            }}
          />
        )}
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header available={available} paths={paths} />
        <main id="main" tabIndex={-1} data-menu-background>
          {children}
        </main>
        <Footer available={available} paths={paths} />
      </body>
    </html>
  );
}
