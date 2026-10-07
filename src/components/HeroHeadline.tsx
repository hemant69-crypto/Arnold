"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const Hindi = () => (
  <>
    <span>व्यवसाय की आकांक्षाएँ।</span>
    <span>उन्हें साकार करने वाले</span>
    <span>लोग।</span>
  </>
);
const English = () => (
  <>
    <span>Business ambition.</span>
    <span>People to make</span>
    <span>it happen.</span>
  </>
);

export function HeroHeadline() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [fontReady, setFontReady] = useState(false);
  const [fontFailed, setFontFailed] = useState(false);
  const loading = useRef<Promise<boolean> | null>(null);
  const mounted = useRef(false);
  const load = useCallback(() => {
    loading.current ??= document.fonts
      .load('500 32px "Arnold Hindi"', "व्यवसाय")
      .then((faces) => {
        const ready = faces.length > 0;
        if (mounted.current) {
          setFontReady(ready);
          setFontFailed(!ready);
        }
        return ready;
      })
      .catch(() => {
        if (mounted.current) setFontFailed(true);
        return false;
      });
    return loading.current;
  }, []);
  useEffect(() => {
    mounted.current = true;
    const eligible = matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const prepare = () => {
      if (eligible.matches) void load();
    };
    prepare();
    eligible.addEventListener("change", prepare);
    return () => {
      mounted.current = false;
      eligible.removeEventListener("change", prepare);
    };
  }, [load]);
  const changeLanguage = async () => {
    if (language === "hi") setLanguage("en");
    else if (await load()) setLanguage("hi");
  };
  return (
    <div className="hero-message">
      <div
        className="hero-headline"
        data-language={language}
        data-font-ready={fontReady}
      >
        <h1 lang={language}>{language === "hi" ? <Hindi /> : <English />}</h1>
        <div className="hero-hindi" aria-hidden="true" lang="hi">
          <Hindi />
        </div>
      </div>
      <div className="headline-language" data-no-lens>
        <button
          type="button"
          onClick={changeLanguage}
          disabled={fontFailed}
          aria-pressed={language === "hi"}
        >
          {language === "en"
            ? "Preview Hindi headline"
            : "Back to English headline"}
        </button>
        <span className="lens-hint" aria-hidden="true">
          A different perspective. Move to explore.
        </span>
        {fontFailed && (
          <span role="status">Hindi text unavailable. Showing English.</span>
        )}
      </div>
    </div>
  );
}
