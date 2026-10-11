import Image from "next/image";
import { company } from "@/content/company";

export function BrandLogo({ preload = false }: { preload?: boolean }) {
  return (
    <Image
      className="brand-logo"
      src={company.logo}
      alt={`${company.name} — ${company.tagline}`}
      width={568}
      height={192}
      unoptimized
      preload={preload}
    />
  );
}
