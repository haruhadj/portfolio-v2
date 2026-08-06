const BOOT_DONE_EVENT = "pf:boot-done";

/** Fired by BootCurtain once it has fully cleared the viewport (or skipped itself). */
export function signalBootDone() {
  window.dispatchEvent(new Event(BOOT_DONE_EVENT));
}

/**
 * Resolves once BootCurtain has signaled it's done, so effects gated on it
 * don't visibly run underneath the curtain. Falls back after 3s in case no
 * curtain is mounted on the page (or something else stops it firing).
 */
export function waitForBootDone(): Promise<void> {
  return new Promise((resolve) => {
    const done = () => resolve();
    window.addEventListener(BOOT_DONE_EVENT, done, { once: true });
    setTimeout(() => {
      window.removeEventListener(BOOT_DONE_EVENT, done);
      resolve();
    }, 3000);
  });
}
