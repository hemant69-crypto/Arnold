import { interests } from "./interests";
export type MeasurementEvent =
  "capability_open" | "consultation_start" | "enquiry_accepted" | "ats_open";
const events = new Set<MeasurementEvent>([
  "capability_open",
  "consultation_start",
  "enquiry_accepted",
  "ats_open",
]);
export function emitMeasurement(
  event: MeasurementEvent,
  context: { service?: string },
  options: {
    enabled: boolean;
    consent: boolean;
    send: (event: MeasurementEvent, data: { service?: string }) => void;
  },
) {
  if (!options.enabled || !options.consent || !events.has(event)) return;
  const service =
    context.service && interests.some(([id]) => id === context.service)
      ? context.service
      : undefined;
  options.send(event, { service });
}
