"use client";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  readVisitPreference,
  setVisitPreference,
  subscribeVisitPreference,
} from "@/lib/visit-preference";

const media = {
  perspective: {
    stem: "perspective",
    alt: "Illustrative city view through an office window",
    position: "48% center",
  },
  technology: {
    stem: "technology-team-hands",
    alt: "Illustrative close view of people working at laptops",
    position: "50% 60%",
  },
  workshop: {
    stem: "team-whiteboard-workshop",
    alt: "Illustrative team discussing ideas at a whiteboard",
    position: "50% center",
  },
  consultingDiscussion: {
    stem: "consulting-discussion",
    alt: "Illustrative group discussing a business question around a shared table",
    position: "50% center",
  },
  consultingPerspective: {
    stem: "consulting-perspective",
    alt: "Illustrative side view of a person considering a city through an office window",
    position: "50% center",
  },
} as const;
let playbackOwner: HTMLVideoElement | null = null;

export function SectionVideo({
  asset,
  label,
  title,
  summary,
  cinematic = false,
  headingLevel = 2,
}: {
  asset: keyof typeof media;
  label: string;
  title: string;
  summary?: string;
  cinematic?: boolean;
  headingLevel?: 2 | 3;
}) {
  const item = media[asset];
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const headingId = useId();
  const root = useRef<HTMLElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const startManual = useRef<(() => void) | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    const section = root.current;
    if (!video || !section) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 768px) and (pointer: fine)");
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    let visible = false;
    let userPaused = false;
    let rejected = false;
    let pending = false;
    let generation = 0;
    let disposed = false;
    const automaticAllowed = () =>
      visible &&
      !document.hidden &&
      !reduced.matches &&
      desktop.matches &&
      !connection?.saveData &&
      !userPaused &&
      !readVisitPreference("arnold-video-paused") &&
      !readVisitPreference("arnold-motion-paused") &&
      document.documentElement.dataset.menuOpen !== "true";
    const stop = () => {
      generation++;
      pending = false;
      video.pause();
    };
    const play = (manual = false) => {
      if (
        disposed ||
        video.error ||
        pending ||
        (!manual && (!automaticAllowed() || rejected))
      )
        return;
      if (playbackOwner && playbackOwner !== video) playbackOwner.pause();
      playbackOwner = video;
      video.src ||= `/media/${item.stem}.mp4`;
      const ticket = ++generation;
      pending = true;
      video
        .play()
        .then(() => {
          if (ticket !== generation || disposed) return;
          pending = false;
          if (!manual && !automaticAllowed()) stop();
        })
        .catch(() => {
          if (ticket !== generation || disposed) return;
          pending = false;
          rejected = true;
        });
    };
    const sync = () => {
      if (automaticAllowed()) play();
      else stop();
    };
    startManual.current = () => {
      if (!video.paused) {
        userPaused = true;
        setVisitPreference("arnold-video-paused", true);
        stop();
      } else {
        userPaused = false;
        rejected = false;
        setVisitPreference("arnold-video-paused", false);
        play(true);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        sync();
      },
      { threshold: [0, 0.25] },
    );
    observer.observe(section);
    const unsubscribe = subscribeVisitPreference(sync);
    reduced.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("arnold-menu", sync);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      unsubscribe();
      reduced.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("arnold-menu", sync);
      startManual.current = null;
      if (playbackOwner === video) playbackOwner = null;
      video.removeAttribute("src");
      video.load();
    };
  }, [item.stem]);
  return (
    <section
      ref={root}
      className={`cinema section-video${cinematic ? " is-cinematic" : ""}`}
      aria-labelledby={headingId}
    >
      <picture>
        <source
          type="image/webp"
          media="(max-width: 767px)"
          srcSet={`/media/${item.stem}-mobile.webp`}
        />
        <source
          media="(max-width: 767px)"
          srcSet={`/media/${item.stem}-mobile.jpg`}
        />
        <Image
          src={`/media/${item.stem}.jpg`}
          alt={item.alt}
          fill
          sizes="100vw"
          style={{ objectPosition: item.position }}
        />
      </picture>
      <video
        ref={ref}
        muted
        playsInline
        loop
        preload="none"
        style={{ opacity: playing ? 1 : 0, objectPosition: item.position }}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
        aria-hidden="true"
      />
      <div className="cinema-shade" />
      <div className="cinema-copy">
        <p>{label}</p>
        <Heading id={headingId}>{title}</Heading>
        {summary && <p className="section-video-summary">{summary}</p>}
      </div>
      <button
        className="cinema-control"
        type="button"
        onClick={() => startManual.current?.()}
        disabled={failed}
      >
        {playing ? "Pause video" : "Play video"}
        <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
      </button>
      {failed && (
        <p className="cinema-status" role="status">
          Video unavailable. Showing the still image.
        </p>
      )}
      <span className="cinema-credit">Illustrative footage</span>
    </section>
  );
}
