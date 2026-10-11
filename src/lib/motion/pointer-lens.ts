/** Shared by the Home/Consulting field and the four pillar fields. */
export const pointerLensRadius = (width: number) =>
  Math.min(145, Math.max(100, width * 0.092));

export function allowsPointerLens(event: PointerEvent) {
  return (
    event.pointerType !== "touch" &&
    !(
      event.target instanceof Element &&
      event.target.closest(
        "a, button, input, textarea, select, summary, [data-no-lens]",
      )
    ) &&
    !window.getSelection()?.toString()
  );
}
