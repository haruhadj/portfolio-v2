"use client";

import { LuMoon, LuSun } from "react-icons/lu";

/**
 * Dark is the default (no data-theme attribute); light sets data-theme="light".
 * Icon visibility is CSS-driven off that attribute, so SSR never mismatches.
 */
export default function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      className="text-muted hover:text-accent transition-colors"
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
    </button>
  );
}
