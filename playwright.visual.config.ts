import { defineConfig, devices } from "@playwright/test";

// Self-hosted Storybook visual-regression harness (DSV2-006).
//
// Deliberately a separate config from playwright.config.ts (the app e2e suite): different
// testDir, different webServer (a static file server for the *built* Storybook, not a Next.js
// dev server), and screenshot-specific `expect` defaults that the e2e suite has no need for.
// Keeping them apart also means `pnpm test:e2e` and `pnpm test:visual` can run independently in
// CI without one job's webServer config affecting the other's.
const PORT = Number(process.env.STORYBOOK_STATIC_PORT ?? 6007);
const STORYBOOK_STATIC_DIR = process.env.STORYBOOK_STATIC_DIR ?? "apps/storybook/storybook-static";
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  // Dedicated, committed baseline directory (ticket requirement) — kept out of testDir's root so
  // it reads unambiguously as generated data, not a test file.
  //
  // Keep snapshot filenames platform-scoped ({platform} token below) rather than mixing
  // OS-specific renders into one baseline. See docs/VISUAL_REGRESSION.md — committed baselines
  // are generated inside the pinned mcr.microsoft.com/playwright:v1.61.1-noble Docker image
  // (Linux/"noble" font stack), which is also what CI runs against, so `-linux` baselines are
  // the ones that matter for CI parity. A locally generated `-darwin`/`-win32` baseline is a
  // convenience for local iteration only and is not expected to byte-match CI.
  snapshotDir: "./tests/visual/__screenshots__",
  snapshotPathTemplate: "{snapshotDir}/{arg}-{platform}{ext}",
  reporter: process.env.CI
    ? [["list"], ["html", { outputFolder: "playwright-report-visual", open: "never" }]]
    : "list",
  expect: {
    toHaveScreenshot: {
      // No maxDiffPixels/maxDiffPixelRatio budget: most stories here are a single small
      // component on an otherwise empty canvas, so a percentage-of-image budget generous enough
      // to absorb rendering noise would also hide a real token-color regression confined to a
      // small swatch (verified while building this harness — a 1% ratio only caught the
      // highest-surface-area story out of several that touched the same changed token). Rely on
      // Playwright's default per-pixel color `threshold` (0.2) for anti-aliasing tolerance
      // instead of a pixel-count budget.
      animations: "disabled",
    },
  },
  use: {
    baseURL,
    trace: "retain-on-failure",
    // Force the reduced-motion media query so CSS transitions/animations authored with a
    // `motion-reduce:` variant (e.g. Button's loading spinner, see packages/ui/src/components/
    // button.tsx) settle into their static end state deterministically, on top of the
    // `animations: "disabled"` screenshot option above.
    reducedMotion: "reduce",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: `node scripts/serve-storybook-static.mjs --dir ${STORYBOOK_STATIC_DIR} --port ${PORT}`,
    url: `${baseURL}/index.json`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
