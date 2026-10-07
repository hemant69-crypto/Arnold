"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & {
  href: string;
};

export function SiteLink({ href, scroll, ...props }: Props) {
  return (
    <Link
      {...props}
      href={href}
      scroll={scroll}
      onNavigate={() => {
        if (scroll === false) return;
        const target = new URL(href, location.href);
        // Next preserves reused route segments. Selecting the current page
        // explicitly still means its beginning; anchors/history keep native intent.
        if (
          !target.hash &&
          target.origin === location.origin &&
          target.pathname === location.pathname &&
          target.search === location.search
        ) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }}
    />
  );
}
