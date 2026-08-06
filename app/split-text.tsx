/**
 * Splits `text` into per-letter spans that stagger in once an ancestor
 * `Reveal` becomes visible. Purely CSS-driven (see `.split-letter`), so this
 * stays a server component. The word is exposed to assistive tech via
 * `aria-label` on the caller's element, not by reading the spans.
 */
export default function SplitText({ text }: { text: string }) {
  return (
    <span aria-hidden className="split-text">
      {[...text].map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="split-letter"
          style={{ transitionDelay: `${60 + i * 26}ms` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
