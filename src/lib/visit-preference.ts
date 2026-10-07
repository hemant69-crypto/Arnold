"use client";
import { useSyncExternalStore } from "react";
const eventName = "arnold-preference";
const memory = new Map<string, boolean>();
export function readVisitPreference(key: string) {
  if (memory.has(key)) return memory.get(key)!;
  try {
    return sessionStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}
export function subscribeVisitPreference(notify: () => void) {
  window.addEventListener(eventName, notify);
  return () => window.removeEventListener(eventName, notify);
}
export function setVisitPreference(key: string, value: boolean) {
  memory.set(key, value);
  try {
    sessionStorage.setItem(key, String(value));
  } catch {
    /* Optional preference only. */
  }
  window.dispatchEvent(new Event(eventName));
}
export function useVisitPreference(key: string) {
  const paused = useSyncExternalStore(
    subscribeVisitPreference,
    () => readVisitPreference(key),
    () => false,
  );
  const setPaused = (value: boolean) => {
    setVisitPreference(key, value);
  };
  return [paused, setPaused] as const;
}
