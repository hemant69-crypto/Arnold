import { PageIntro } from "./PageIntro";
import { SceneAtmosphere, type SceneVariant } from "./SceneAtmosphere";

export function PillarIntro({
  variant,
  ...intro
}: {
  variant: Exclude<SceneVariant, "founder">;
  label: string;
  title: string;
  summary: string;
  cta: string;
  href: string;
}) {
  return (
    <div
      className={`pillar-experience pillar-${variant}`}
      data-scene={variant}
      data-field-status="static"
    >
      <SceneAtmosphere variant={variant} />
      <PageIntro {...intro} />
    </div>
  );
}
