"use client";
import { SiteLink as Link } from "./SiteLink";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { company } from "@/content/company";
const groups = [
  [
    ["Home", "/"],
    ["Consulting", "/consulting"],
    ["Capabilities", "/capabilities"],
  ],
  [
    ["GCC", "/gcc"],
    ["Approach", "/approach"],
    ["About", "/about"],
  ],
  [
    ["Insights", "/insights"],
    ["Contact", "/contact"],
    ["Opportunities", "/opportunities"],
  ],
];
const services = [
  ["Permanent Staffing", "permanent-staffing"],
  ["Executive Search", "executive-search"],
  ["Recruitment Process Outsourcing", "recruitment-process-outsourcing"],
  ["HR Solutions", "hr-solutions"],
  ["Temporary Staffing", "temporary-staffing"],
  ["Capability Building", "training"],
];
export function Header({
  available,
  paths,
}: {
  available: string[];
  paths: string[];
}) {
  const pathname = usePathname();
  const details = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const desiredOpen = useRef(false);
  const generation = useRef(0);
  const animation = useRef<ReturnType<
    typeof import("@/lib/motion/menu").createMenuMotion
  > | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const setMenu = useCallback(async (next: boolean, immediate = false) => {
    desiredOpen.current = next;
    if (next) setOpen(true);
    const ticket = ++generation.current;
    const disclosure = details.current;
    const sheet = panel.current;
    const shade = scrim.current;
    if (!disclosure || !sheet || !shade) return;
    if (next && !disclosure.open) sheet.scrollTop = 0;
    if (immediate || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(next);
      animation.current?.dispose();
      animation.current = null;
      sheet.style.visibility = "";
      disclosure.open = next;
      return;
    }
    if (!next && !animation.current) {
      setOpen(false);
      disclosure.open = false;
      sheet.style.visibility = "";
      return;
    }
    if (next && !disclosure.open) {
      if (!animation.current) sheet.style.visibility = "hidden";
      disclosure.open = true;
    }
    if (!animation.current) {
      try {
        const { createMenuMotion } = await import("@/lib/motion/menu");
        if (ticket !== generation.current) return;
        animation.current = createMenuMotion(sheet, shade, () => {
          if (!desiredOpen.current && details.current)
            details.current.open = false;
        });
      } catch {
        sheet.style.visibility = "";
        disclosure.open = desiredOpen.current;
        setOpen(desiredOpen.current);
        if (desiredOpen.current)
          sheet
            .querySelector<HTMLAnchorElement>("a")
            ?.focus({ preventScroll: true });
        return;
      }
    }
    if (next) {
      animation.current.open();
      sheet
        .querySelector<HTMLAnchorElement>("a")
        ?.focus({ preventScroll: true });
    } else animation.current.close();
  }, []);
  const close = useCallback(() => {
    void setMenu(false);
  }, [setMenu]);
  useEffect(() => {
    generation.current++;
    desiredOpen.current = false;
    animation.current?.dispose();
    animation.current = null;
    if (panel.current) panel.current.style.visibility = "";
    if (details.current) details.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      generation.current++;
      animation.current?.dispose();
      animation.current = null;
      if (panel.current) panel.current.style.visibility = "";
      if (details.current) details.current.open = desiredOpen.current;
    };
    reduced.addEventListener("change", change);
    return () => {
      change();
      reduced.removeEventListener("change", change);
    };
  }, []);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.menuOpen = String(open);
    window.dispatchEvent(new Event("arnold-menu"));
    if (!open) return;
    const elements = [
      ...document.querySelectorAll<HTMLElement>("[data-menu-background]"),
    ];
    const overflow = document.body.style.overflow;
    const summary = trigger.current;
    elements.forEach((el) => (el.inert = true));
    document.body.style.overflow = "hidden";
    panel.current
      ?.querySelector<HTMLAnchorElement>("a")
      ?.focus({ preventScroll: true });
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key !== "Tab") return;
      const targets = [
        ...(details.current?.querySelectorAll<HTMLElement>(
          "summary, a, button",
        ) ?? []),
      ].filter((el) => el.getClientRects().length > 0);
      const first = targets[0],
        last = targets.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        // Let the menu's scrollport reveal the focused link on short screens.
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      elements.forEach((el) => (el.inert = false));
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      summary?.focus({ preventScroll: true });
      document.documentElement.dataset.menuOpen = "false";
      window.dispatchEvent(new Event("arnold-menu"));
    };
  }, [open, close]);
  const navLink = (label: string, href: string, className?: string) => (
    <Link
      className={className}
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      onClick={() => {
        void setMenu(false, true);
      }}
    >
      {label}
    </Link>
  );
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <Link
        className="wordmark"
        href="/"
        data-menu-background
        aria-label="Arnold Consulting home"
      >
        arnold <span>consulting</span>
      </Link>
      <nav className="nav-groups" aria-label="Primary" data-menu-background>
        {groups.map((group, i) => (
          <div key={i}>
            {group
              .filter(([, href]) => paths.includes(href))
              .map(([label, href]) => (
                <span key={href}>{navLink(label, href)}</span>
              ))}
          </div>
        ))}
      </nav>
      <Link
        className="mobile-opportunities"
        href="/opportunities"
        data-menu-background
      >
        Opportunities
      </Link>
      <div
        className="menu-dialog"
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? "Explore Arnold Consulting" : undefined}
      >
        <details
          ref={details}
          className="menu"
          onToggle={(event) => {
            if (!event.currentTarget.open) {
              desiredOpen.current = false;
              setOpen(false);
            }
          }}
        >
          <summary
            ref={trigger}
            aria-controls="menu-panel"
            className="menu-trigger"
            onClick={(event) => {
              event.preventDefault();
              void setMenu(!desiredOpen.current);
            }}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className="menu-lines" aria-hidden="true" />
          </summary>
          <div
            className="menu-scrim"
            ref={scrim}
            aria-hidden="true"
            onClick={close}
          />
          <div className="menu-panel" id="menu-panel" ref={panel}>
            <p className="menu-intro">
              A clearer view.
              <br /> A stronger team.
            </p>
            <nav aria-label="Expanded navigation" className="expanded-nav">
              <div>
                {[
                  ["Home", "/"],
                  ["Consulting", "/consulting"],
                  ["Capabilities", "/capabilities"],
                  ["GCC & Enterprise Capability", "/gcc"],
                  ["Expertise", "/expertise"],
                  ["For employers", "/employers"],
                ]
                  .filter(([, href]) => paths.includes(href))
                  .map(([label, href]) => (
                    <div key={href}>{navLink(label, href)}</div>
                  ))}
              </div>
              <div>
                {[
                  ["Approach", "/approach"],
                  ["About", "/about"],
                  ["Insights", "/insights"],
                  ["Contact", "/contact"],
                  ["Opportunities", "/opportunities"],
                ]
                  .filter(([, href]) => paths.includes(href))
                  .map(([label, href]) => (
                    <div key={href}>{navLink(label, href)}</div>
                  ))}
              </div>
            </nav>
            <nav className="menu-services" aria-label="Services">
              {services
                .filter(([, slug]) => available.includes(slug))
                .map(([label, slug]) => (
                  <span key={slug}>
                    {navLink(label, `/capabilities/${slug}`)}
                  </span>
                ))}
            </nav>
            <div className="menu-bottom">
              Rooted in India. Working with the USA.
              <div>
                <a
                  className="menu-social"
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                {navLink("Privacy", "/privacy")}
                {navLink("Terms", "/terms")}
              </div>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
