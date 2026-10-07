import Image from "next/image";
import { clientLogos } from "@/content/client-logos";
import { publicReleaseEnabled } from "@/lib/site-config";
import { ClientStripMotion } from "./ClientStripMotion";

export function ClientStrip() {
  // Ready for local review; public evidence follows the existing release review.
  if (
    publicReleaseEnabled &&
    process.env.CLIENT_LOGOS_PUBLIC_APPROVED !== "true"
  )
    return null;
  return (
    <ClientStripMotion>
      <div
        className="client-strip-viewport"
        tabIndex={0}
        role="group"
        aria-label="Client logos"
      >
        <div className="client-logo-track" id="client-logo-track">
          {[false, true].map((duplicate) => (
            <ul
              className="client-logo-group"
              key={String(duplicate)}
              aria-label={
                duplicate
                  ? undefined
                  : "Selected clients from Arnold’s company profile"
              }
              aria-hidden={duplicate || undefined}
            >
              {clientLogos.map((logo) => (
                <li key={logo.id}>
                  <Image
                    src={`/media/clients/${logo.id}.webp`}
                    alt={duplicate ? "" : logo.name}
                    width={logo.width}
                    height={logo.height}
                    unoptimized
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </ClientStripMotion>
  );
}
