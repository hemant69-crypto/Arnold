import Image from "next/image";
import { company } from "@/content/company";

export function BrandLogo({
  preload = false,
  surface = "light",
}: {
  preload?: boolean;
  surface?: "light" | "dark";
}) {
  const dark = surface === "dark";
  return (
    <Image
      className={`brand-logo brand-logo--${surface}`}
      src={dark ? company.darkLogo : company.logo}
      alt={`${company.name} — ${company.tagline}`}
      width={dark ? 1959 : 568}
      height={dark ? 803 : 192}
      unoptimized
      preload={preload}
    />
  );
}
