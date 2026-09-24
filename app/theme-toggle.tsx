"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import SpecularButton from "./specular-button";

/**
 * Dark is the default (no data-theme attribute); light sets data-theme="light".
 * Icon visibility is CSS-driven off that attribute, so SSR never mismatches.
 */
export default function ThemeToggle() {
  return (
    <SpecularButton
      size="sm"
      aria-label="Toggle color theme"
      className="theme-toggle"
      tint="#182126"
      tintOpacity={0.72}
      textColor="#aeb9b5"
      lineColor="#d4a85c"
      baseColor="#53615a"
      onClick={() => {
        const root = document.documentElement;
        const next = root.dataset.theme === "light" ? "dark" : "light";
        if (next === "light") {
          root.dataset.theme = "light";
        } else {
          delete root.dataset.theme;
        }
        try {
          localStorage.setItem("theme", next);
        } catch {
          /* private mode — theme just won't persist */
        }
      }}
    >
      <LuSun className="theme-icon-sun size-4" aria-hidden />
      <LuMoon className="theme-icon-moon size-4" aria-hidden />
    </SpecularButton>
  );
}
