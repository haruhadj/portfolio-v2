"use client";

import { useCallback, useRef } from "react";
import useScrollEffect from "./use-scroll-effect";

type RailLink = { id: string; label: string };

/** Fades in past the hero, so it never competes with the particle field. */
const REVEAL_AT_VIEWPORTS = 0.7;
const ACTIVE_LINE = 0.45;

/**
 * The site's only navigation: a fixed left-edge rail that tracks the section
 * in view. Below lg it re-lays out as a bottom dock — see `.section-rail` in
 * globals.css, which also opts the dock out of the hero reveal gate.
 */
export default function SectionRail({
  links,
  mark,
}: {
  links: readonly RailLink[];
  mark: string;
}) {
  const ref = useRef<HTMLElement>(null);

  const paint = useCallback(() => {
    const rail = ref.current;
    if (!rail) return;
    const anchors = Array.from(rail.querySelectorAll<HTMLAnchorElement>("[data-rail]"));
    const vh = window.innerHeight;
    rail.classList.toggle("is-revealed", window.scrollY > vh * REVEAL_AT_VIEWPORTS);

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
      const isActive = anchor.dataset.rail === active;
      anchor.classList.toggle("is-active", isActive);
      if (isActive) {
        anchor.setAttribute("aria-current", "true");
      } else {
        anchor.removeAttribute("aria-current");
      }
    }
  }, []);

  useScrollEffect(paint);

  return (
    <nav ref={ref} className="section-rail" aria-label="Sections">
      <a href="#top" className="rail-mark">
        {mark}
      </a>
      <div className="rail-links">
        {links.map((link) => (
          <a key={link.id} href={`#${link.id}`} data-rail={link.id} className="rail-link">
            <span className="rail-bar" aria-hidden />
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
