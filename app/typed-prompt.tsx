"use client";

import { useEffect, useState } from "react";

const COMMAND = "whoami";
const TYPE_INTERVAL_MS = 90;
const START_DELAY_MS = 400;

export default function TypedPrompt() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(
      () => {
        if (reduceMotion) {
          setTyped(COMMAND);
          setDone(true);
          return;
        }
        interval = setInterval(() => {
          i += 1;
          setTyped(COMMAND.slice(0, i));
          if (i === COMMAND.length) {
            clearInterval(interval);
            setDone(true);
          }
        }, TYPE_INTERVAL_MS);
      },
      reduceMotion ? 0 : START_DELAY_MS
    );
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, []);

  return (
    <p className="font-mono text-sm sm:text-base" aria-label={`$ ${COMMAND}`}>
      <span className="text-muted">haruhadj@portfolio</span>
      <span className="text-foreground">:</span>
      <span className="text-accent">~</span>
      <span className="text-foreground">$ </span>
      <span aria-hidden>{typed}</span>
      {!done && <span className="cursor-block" aria-hidden />}
    </p>
  );
}
