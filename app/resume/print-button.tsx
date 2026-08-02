"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 border border-accent px-4 py-2 text-accent transition-colors duration-300 hover:bg-accent hover:text-background"
    >
      save as PDF ↓
    </button>
  );
}
