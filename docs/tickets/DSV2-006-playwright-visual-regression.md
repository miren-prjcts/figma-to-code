# DSV2-006 — Playwright Visual Regression Harness

## Dependency

`DSV2-002` is integrated, so baseline screenshots capture the hardened interaction/accessibility states rather than states requiring an immediate re-baseline. `DSV2-005` review of the foundation batch is complete.

## Objective

Add a self-hosted, free visual-regression harness for Storybook using Playwright's built-in screenshot comparison, so unintended visual changes to tokens and components are caught in CI without a third-party SaaS dependency.

## Scope

- Add `@storybook/test-runner` as a dev dependency and configure it to run against the built Storybook (`apps/storybook`).
- Add a Playwright-based visual test that iterates the Storybook story index and calls `expect(page).toHaveScreenshot()` for each published story (all Button/Input/Badge/StatCard/Modal variants and the tokens story), covering both Light and Dark themes.
- Commit baseline screenshots to the repository under a dedicated snapshot directory.
- Pin the rendering environment (browser/OS via the existing `@playwright/test` Desktop Chrome project, or a Docker image if local/CI rendering diverges) so diffs reflect real visual changes, not font-hinting or OS-rendering noise.
- Wire a new job or step into `.github/workflows/ci.yml` alongside the existing `test:e2e` step, uploading the diff artifact on failure.
- Document the update-baseline workflow (command to re-run and accept new screenshots) in the relevant governance doc.

## Deliberate exclusions

- Chromatic, Percy, or any hosted visual-diffing service — free tiers of paid SaaS are out of scope per the self-hosted requirement.
- Visual coverage of `apps/web` application pages beyond what `tests/e2e/home.spec.ts` already exercises; this ticket scopes to Storybook (the component-library surface).
- New components, token changes, or component API changes.
- Automatic baseline acceptance on merge; baseline updates remain a reviewed, explicit commit.

## Acceptance criteria

- `pnpm test:visual` (or equivalent script) runs locally and in CI, comparing every published story against a committed baseline in both themes.
- A deliberate visual change (e.g., a token tweak) produces a failing diff with an inspectable artifact; reverting the change passes again.
- CI wiring does not modify or weaken the existing `typecheck`/`test`/`lint`/`build` steps.
- No screenshot or design asset leaves the repository/CI runner to a third-party service.
- The baseline-update workflow is documented for future contributors.
- Typecheck, lint, formatting, and the full existing verification suite still pass with the new dependency added.

## Handoff

Report the chosen tooling versions, the story/theme coverage matrix, CI evidence (a passing run and a deliberately-failing run), and any rendering-stability risk (e.g., font loading timing) still open for follow-up.
