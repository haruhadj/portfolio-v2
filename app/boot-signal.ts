const BOOT_DONE_EVENT = "pf:boot-done";
const BOOT_RELEASE_EVENT = "pf:boot-release";

/** Fired as the opaque curtain starts fading, so the galaxy can prepare once. */
export function signalBootRelease() {
  window.dispatchEvent(new Event(BOOT_RELEASE_EVENT));
}

/** Fired by BootCurtain once it has fully cleared the viewport (or skipped itself). */
export function signalBootDone() {
  window.dispatchEvent(new Event(BOOT_DONE_EVENT));
}

/**
 * Resolves once BootCurtain has signaled it's done, so effects gated on it
 * don't visibly run underneath the curtain. Falls back after 5s in case no
 * curtain is mounted on the page (or something else stops it firing).
 */
export function waitForBootDone(): Promise<void> {
  return new Promise((resolve) => {
    const done = () => resolve();
    window.addEventListener(BOOT_DONE_EVENT, done, { once: true });
    setTimeout(() => {
      window.removeEventListener(BOOT_DONE_EVENT, done);
      resolve();
    }, 5000);
  });
}

/** Resolves when the curtain begins its final fade. */
export function waitForBootRelease(): Promise<void> {
  return new Promise((resolve) => {
    const done = () => resolve();
    window.addEventListener(BOOT_RELEASE_EVENT, done, { once: true });
    setTimeout(() => {
      window.removeEventListener(BOOT_RELEASE_EVENT, done);
      resolve();
    }, 5000);
  });
}
