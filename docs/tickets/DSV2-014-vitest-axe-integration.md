# DSV2-014 — vitest-axe Integration

## Dependency

None on other Phase 1 tickets — starts immediately alongside `DSV2-011`/`DSV2-012`/`DSV2-013`/
`DSV2-006`, per `BACKLOG.md`'s Phase Plan instruction to stand up verification tooling alongside
Phase 1 rather than after it. Runs as its own track, separate from `DSV2-006`, so each verification
layer lands and is reviewed independently.

## Objective

Wire automated accessibility assertions into `packages/ui`'s existing Vitest suite, so every
component ticket — from this phase forward — has a real automated a11y check rather than a manual
review claim.

## Scope

- Add `vitest-axe` (verify it is the actively maintained, free option before pinning — do not assume
  the package name without checking) as a dev dependency to `packages/ui`.
- Extend `packages/ui`'s existing Vitest setup/config to expose the `toHaveNoViolations` matcher.
- Add at least one `axe` assertion to each existing component's test file (Button, Input, Badge,
  StatCard, Modal) as the baseline, and require the same pattern in each Phase 1 component's own
  test file as it lands (`DSV2-011`/`DSV2-012`/`DSV2-013`).
- Document the pattern (one paragraph) in the relevant governance doc so Phase 1/2/3 tickets reuse
  it instead of reinventing it.

## Deliberate exclusions

- Replacing manual accessibility review — axe catches a subset of WCAG failures (contrast, ARIA
  misuse, missing labels) and does not replace the keyboard-model verification Charter §4 rule 4
  already requires.
- The Playwright visual-regression harness — scoped separately in `DSV2-006`.
- New components, token changes, or component API changes.

## Acceptance criteria

- `pnpm --filter @repo/ui test` runs the new axe assertions and fails on a deliberately introduced
  violation (e.g., a missing `aria-label`); reverting the change passes again.
- Existing five components each have a passing axe assertion.
- Typecheck, lint, formatting, and the production build are unaffected by the new dependency.

## Handoff

Report the chosen package/version, CI evidence (a passing run and a deliberately-failing run), and
the documented pattern's location for later phases to reuse.
