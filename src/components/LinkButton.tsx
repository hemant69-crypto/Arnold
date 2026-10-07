import { SiteLink as Link } from "./SiteLink";
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16M13 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
export function LinkButton({
  href,
  children,
  quiet = false,
}: {
  href: string;
  children: React.ReactNode;
  quiet?: boolean;
}) {
  return (
    <Link className={`link-button${quiet ? " quiet" : ""}`} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
