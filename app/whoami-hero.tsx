"use client";

import { useEffect, useState } from "react";
import { waitForBootDone } from "./boot-signal";

const NAME = "Michael Fernandez";
const HANDLE = "haruhadj";

/** Types, holds, and erases the portfolio identity after the boot sequence. */
export default function WhoamiHero() {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");

  useEffect(() => {
    let disposed = false;
    let timer = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    waitForBootDone().then(() => {
      if (disposed) return;
      if (reduceMotion) {
        setName(NAME);
        setHandle(HANDLE);
        return;
      }
      const schedule = (callback: () => void, delay: number) => {
        timer = window.setTimeout(() => { if (!disposed) callback(); }, delay);
      };
      const eraseName = (index: number) => {
        setName(NAME.slice(0, index));
        if (index > 0) schedule(() => eraseName(index - 1), 28);
        else schedule(() => typeName(1), 460);
      };
      const eraseHandle = (index: number) => {
        setHandle(HANDLE.slice(0, index));
        if (index > 0) schedule(() => eraseHandle(index - 1), 28);
        else schedule(() => eraseName(NAME.length - 1), 170);
      };
      const typeHandle = (index: number) => {
        setHandle(HANDLE.slice(0, index));
        if (index < HANDLE.length) schedule(() => typeHandle(index + 1), 46);
        else schedule(() => eraseHandle(HANDLE.length - 1), 2200);
      };
      const typeName = (index: number) => {
        setName(NAME.slice(0, index));
        if (index < NAME.length) schedule(() => typeName(index + 1), 46);
        else schedule(() => typeHandle(1), 240);
      };
      typeName(1);
    });

    return () => {
      disposed = true;
      window.clearTimeout(timer);
    };
  }, []);

  return <>
    <p className="whoami-command"><span>~/portfolio $</span> whoami</p>
    <h1 id="hero-title" aria-label="Michael Fernandez, known online as haruhadj" className="whoami-output">
      <span>{name}{name.length < NAME.length && <i className="whoami-cursor" aria-hidden />}</span>
      <span className={`whoami-handle ${name.length === NAME.length ? "is-active" : ""}`}><small>aka</small>{handle}{name.length === NAME.length && handle.length < HANDLE.length && <i className="whoami-cursor" aria-hidden />}</span>
    </h1>
  </>;
}
