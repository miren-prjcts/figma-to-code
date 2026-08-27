import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import { afterEach, expect } from "vitest";

// Registers `toHaveNoViolations()` for use with `axe(container)` results — see
// `packages/ui/src/test/jest-axe.d.ts` for why `jest-axe` (not `vitest-axe`) was chosen, and
// DESIGN_SYSTEM_CHARTER.md §6 for how this complements the existing manual a11y baseline.
expect.extend(toHaveNoViolations);

// jsdom does not implement matchMedia. Default every query — most relevantly
// `(prefers-reduced-motion: reduce)`, which Modal's transition reads — to
// "matches: true" so tests are deterministic and synchronous by default
// (no real timers needed to observe Modal's mount/unmount). Tests that
// specifically exercise the animated (non-reduced-motion) path override
// `window.matchMedia` for that one test and restore it afterward.
if (typeof window.matchMedia !== "function") {
  window.matchMedia = ((query: string) =>
    ({
      matches: true,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList) as typeof window.matchMedia;
}

afterEach(() => {
  cleanup();
});
