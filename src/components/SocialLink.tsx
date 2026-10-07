import { company } from "@/content/company";
import { Arrow } from "./LinkButton";

export function CompanyLinkedIn({
  children = "Arnold on LinkedIn",
}: {
  children?: React.ReactNode;
}) {
  return (
    <a
      className="company-social"
      href={company.linkedin}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow diagonal />
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
