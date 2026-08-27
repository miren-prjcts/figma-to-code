# Visual Regression (Storybook)

Self-hosted, free-only visual-diffing for `packages/ui`'s Storybook stories, using Playwright's
built-in `toHaveScreenshot()` — no Chromatic/Percy/hosted SaaS, per
[`DESIGN_SYSTEM_CHARTER.md`](./DESIGN_SYSTEM_CHARTER.md) and the batch-wide "no paid tooling"
constraint in [`BACKLOG.md`](./BACKLOG.md).

## How it works

- `tests/visual/storybook.spec.ts` reads `apps/storybook/storybook-static/index.json` (the story
  manifest Storybook's own production build emits) and generates one test per story × Light/Dark
  theme. New stories are picked up automatically — no edit to this file is needed when a future
  component ticket adds stories.
- `playwright.visual.config.ts` is a separate Playwright config from the root `playwright.config.ts`
  (the app e2e suite): different `testDir`, a static-file-server `webServer` for the built
  Storybook instead of the Next.js dev server, and screenshot-specific `expect` defaults.
- Baselines live in `tests/visual/__screenshots__/`, committed to the repository, named
  `{story}-{theme}-{platform}.png`.

## Running it

```bash
pnpm --filter @repo/storybook build-storybook
pnpm test:visual
```

To accept new baselines after a deliberate visual change (a token tweak, a new component state):

```bash
pnpm --filter @repo/storybook build-storybook
pnpm test:visual:update
```

Review the changed `.png` files as you would any other diff before committing — a baseline update
is a reviewed, explicit commit, never automatic on merge.

## Platform baseline note

Snapshot filenames are platform-scoped (`{platform}` = Playwright's coarse `darwin`/`linux`/`win32`
tag) so renders from different OSes never get compared against each other — font hinting and
anti-aliasing genuinely differ between macOS (Quartz) and Linux (FreeType).

The committed baselines are all `-darwin` (generated locally on macOS, this project's actual dev
platform), so the `visual-regression` CI job runs on `macos-latest` rather than the rest of the
suite's `ubuntu-latest` (see `.github/workflows/ci.yml`) — matching the runner to the baseline's
platform, instead of generating a second `-linux` baseline set via Docker. This repository is
public, so GitHub Actions minutes are free and unlimited on every runner OS (no per-minute
multiplier applies, unlike on a private repo's free tier); the `macos-latest` choice here is about
matching the committed baseline's platform, not cost. The rest of CI (typecheck/lint/test/build/e2e)
stays on `ubuntu-latest` since those checks don't depend on OS-level rendering — only Playwright's
pixel-level screenshot comparison does.

## Rendering-stability notes

- `animations: "disabled"` plus `reducedMotion: "reduce"` settle CSS transitions/animations
  (e.g. Button's loading spinner) into their static end state deterministically.
- No `maxDiffPixelRatio` screenshot budget is set: a percentage-of-image tolerance generous enough
  to absorb rendering noise on a mostly-empty canvas would also hide a real token-color regression
  confined to a small swatch (verified while building this harness). Playwright's default
  per-pixel `threshold` (0.2) is relied on instead, for anti-aliasing tolerance only.
- Font loading timing is a residual risk common to any Storybook screenshot harness (Geist/Geist
  Mono variable fonts loading asynchronously) — not yet stress-tested under CI's cold cache;
  worth revisiting if CI shows flaky first-run diffs unrelated to real changes.
