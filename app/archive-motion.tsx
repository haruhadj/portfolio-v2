"use client";

import { useEffect } from "react";

/** Keeps section navigation and project lighting responsive to the reading position. */
export default function ArchiveMotion() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".orbit-header");
    const navigation = Array.from(document.querySelectorAll<HTMLAnchorElement>(".orbit-nav a"));
    const sections = ["work", "about", "stack", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const shots = Array.from(document.querySelectorAll<HTMLElement>(".orbit-project-media"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame: number | undefined;

    const syncNavigation = () => {
      const readingLine = window.innerHeight * 0.38;
      const activeSection = sections.reduce<HTMLElement | null>((closest, section) => {
        if (!closest) return section;
        return Math.abs(section.getBoundingClientRect().top - readingLine) < Math.abs(closest.getBoundingClientRect().top - readingLine)
          ? section
          : closest;
      }, null);
      navigation.forEach((link) => link.classList.toggle("is-active", link.hash === `#${activeSection?.id}`));
      header?.classList.toggle("is-scrolled", window.scrollY > 80);
    };

    const scheduleNavigationSync = () => {
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(() => {
        frame = undefined;
        syncNavigation();
      });
    };

    syncNavigation();
    window.addEventListener("scroll", scheduleNavigationSync, { passive: true });
    window.addEventListener("resize", scheduleNavigationSync);

    const shotCleanups = shots.map((shot) => {
      const move = (event: PointerEvent) => {
        if (reduceMotion) return;
        const box = shot.getBoundingClientRect();
        shot.style.setProperty("--shot-x", `${event.clientX - box.left}px`);
        shot.style.setProperty("--shot-y", `${event.clientY - box.top}px`);
      };
      shot.addEventListener("pointermove", move, { passive: true });
      return () => shot.removeEventListener("pointermove", move);
    });

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleNavigationSync);
      window.removeEventListener("resize", scheduleNavigationSync);
      shotCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
