"use client";

import { useEffect, useRef } from "react";

type RailLink = { id: string; label: string };

/** Fades in past the hero, so it never competes with the particle field. */
const REVEAL_AT_VIEWPORTS = 0.7;
const ACTIVE_LINE = 0.45;

/**
 * Fixed left-edge navigation rail that tracks the section in view.
 * Hidden below lg — there is no room for it beside the content column.
 */
export default function SectionRail({ links }: { links: readonly RailLink[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    const anchors = Array.from(rail.querySelectorAll<HTMLAnchorElement>("[data-rail]"));
    let ticking = false;

    const paint = () => {
      ticking = false;
      const vh = window.innerHeight;
      rail.style.opacity = window.scrollY > vh * REVEAL_AT_VIEWPORTS ? "1" : "0";

      let active = "";
      const doc = document.documentElement;
      const atBottom = window.scrollY + vh >= doc.scrollHeight - 2;
      if (atBottom && anchors.length) {
        active = anchors[anchors.length - 1].dataset.rail ?? "";
      } else {
        for (const anchor of anchors) {
          const section = document.getElementById(anchor.dataset.rail ?? "");
          if (section && section.getBoundingClientRect().top < vh * ACTIVE_LINE) {
            active = anchor.dataset.rail ?? "";
          }
        }
      }
      for (const anchor of anchors) {
        anchor.classList.toggle("is-active", anchor.dataset.rail === active);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav ref={ref} className="section-rail" aria-label="Sections">
      {links.map((link) => (
        <a key={link.id} href={`#${link.id}`} data-rail={link.id} className="rail-link">
          <span className="rail-bar" aria-hidden />
          {link.label}
        </a>
      ))}
    </nav>
  );
}
