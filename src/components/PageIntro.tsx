import { LinkButton } from "./LinkButton";

export function PageIntro({
  label,
  title,
  summary,
  cta,
  href = "/contact",
}: {
  label: string;
  title: string;
  summary: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="page-intro">
      <p className="section-label">{label}</p>
      <h1>{title}</h1>
      <div className="intro-bottom">
        <p>{summary}</p>
        {cta ? <LinkButton href={href}>{cta}</LinkButton> : null}
      </div>
    </section>
  );
}
