# Decisions

## 2026-08-25 — Repository ownership

`miren-prjcts/figma-to-code` is the only project repository. Do not use or sync work to `ds-starter`.

## 2026-08-25 — Typography

Geist is the canonical sans-serif family and Geist Mono is the canonical monospace family in code and Figma.

## 2026-08-25 — Design-system v1 foundations

Build a local code-backed Figma library. Do not reuse Material 3 or attached external libraries as the implementation system.

## 2026-08-26 — Golden Pact

The project follows the approval-gated, supervisor-led workflow in `AGENTS.md` and `docs/PROJECT_OPERATIONS.md`. No ticket execution begins without explicit approval after tickets and model assignments are presented. The primary agent supervises no more than five active agents.

## 2026-08-26 — DS v1 dialog contract

Modal is a controlled dialog with explicit close-request reasons, opt-in backdrop dismissal, focus containment/return, and scroll locking. The implementation remains project-owned and does not introduce a runtime dialog dependency.

## 2026-08-27 — Figma file information architecture

Component families get their own Figma page instead of one growing flat `Components` canvas — the
same "one category, one page" convention `Foundations / Color`/`Typography`/`Layout`/`Effects`
already used. Executed for what already existed (no new component work): the three private icon
components and their documentation frame moved out of `Components` into a new
`Foundations / Icons` page (positioned after `Foundations / Effects`), and `Components` was renamed
to `Components / Core` to seed the family-based naming that `Components / Forms`,
`Components / Feedback`, `Components / Navigation`, and `Components / Structural` will follow as
Phases 1–3 land. Verified zero broken instances (`findAllWithCriteria` scan) after the move; moving
a main component to another page does not affect instances that reference it by ID.

## 2026-08-27 — Components / Core page layout

`Components / Core` reflowed from a scattered layout (5 documentation frames in one unaligned row,
5 component matrices stacked below in a different, non-matching order) into a single left-aligned
column: page title + dek matching the `Foundations / *` header convention, then one section per
component (documentation frame directly above its own matrix, in the fixed order Button → Input →
Badge → StatCard → Modal), each section separated by consistent spacing. `Modal / State specimens`
sits directly under the Modal section as its natural continuation. No component content changed —
positions only. Verified with a document-wide instance scan (118 instances, 0 broken) and a full-page
screenshot.

## 2026-08-27 — Phase 0/1 agent cap raised and executors restricted to Claude

For the Phase 0/Phase 1 batch (`DSV2-008` through `DSV2-016`, `DSV2-014`), the user raised the Golden
Pact's (2026-08-26) five-active-agent cap to six, on two explicit conditions: the primary agent (this
session) remains the sole supervisor/master directly overseeing every spawned agent, and every
non-primary-agent ticket owner is a Claude agent (`general-purpose`), not a GPT-family one. This
supersedes the `gpt-5.6-sol`/`gpt-5.6-terra` placeholder owners originally proposed for this batch in
`tickets/README.md` — those names stay unchanged in the DS v1/DS v2 historical tables above, which
this decision does not retroactively rewrite. Serialized Figma work and phase-review gates
(`DSV2-009`, `DSV2-010`, `DSV2-015`, `DSV2-016`) remain the primary agent's own work, unchanged.

## 2026-08-27 — DS gap audit locked as the next-batch baseline

An independent gap audit of Foundations (`6:3`–`6:6`) and the 5 shipped components (`6:8`) against `packages/tokens`/`packages/ui` is locked as the baseline for the next execution batch, recorded as a Phase Plan in `BACKLOG.md`. Three constraints apply to every phase in this batch: no Figma Code Connect (unavailable on the current Figma Pro plan — `FIGMA_PARITY_CHECKLIST.md`'s manual process and `DSV2-006` remain the parity safeguards), no paid tooling of any kind, and `@repo/ui` publishing/versioning stays out of scope until a full first product version exists. The old `DS v1.1`/`v1.2`/`v1.3` backlog rows are superseded by the new Phase 0–3 structure.

## 2026-08-27 — Phase 0/1 code integration

`DSV2-006`, `DSV2-008`, `DSV2-011`, `DSV2-012`, `DSV2-013`, `DSV2-014` ran as six parallel
worktree-isolated agents (see the 2026-08-27 agent-cap decision above) and were integrated into
`main`'s working tree by the primary agent after independently re-running each one's verification
suite (not trusting the agents' own reports). Reconciliation decisions made where tickets touched
the same files:

- **`isAriaInvalid` canonical location**: `packages/ui/src/components/input.tsx` (exported), per
  `DSV2-011`. `DSV2-012` had copied the same helper into `lib/utils.ts` to avoid a concurrent-edit
  collision with `DSV2-011` on `input.tsx`; that copy was dropped and `select.tsx`/`textarea.tsx`
  now import from `./input` instead.
- **FormField in Select/Textarea Storybook stories**: `DSV2-012`'s interim `FormFieldDemo` stand-in
  (used because `DSV2-011` was not yet integrated when those stories were written) was replaced
  with the real `FormField` from `DSV2-011`.
- **Shared-file merges**: `packages/tokens/src/tokens.css`, `apps/storybook/.storybook/app.css`,
  `apps/web/app/globals.css`, `packages/ui/src/index.ts`, and `packages/ui/src/test/setup.ts` each
  had non-overlapping additions from two or more tickets, combined by hand; `pnpm-lock.yaml` was
  regenerated fresh via `pnpm install` after merging every ticket's `package.json` dependency
  additions, rather than merged by hand.
- **New defect found and fixed during integration, not present in any single ticket's own
  worktree**: once `packages/ui/src/index.ts` re-exported both server-safe components and several
  `"use client"` ones (Modal, FormField, Checkbox, Radio, Switch) from the same barrel, `next dev`'s
  RSC bundler mis-evaluated the barrel's client-boundary splitting (`createContext is not a
function`, thrown for a component `apps/web/app/page.tsx` never imports). Fixed via
  `experimental.optimizePackageImports: ["@repo/ui"]` in `apps/web/next.config.mjs` — Next's own
  documented fix for large barrel-exporting workspace packages — which also shrank the page's
  bundle (13.5 kB → 123 B) as a side effect. `pnpm test:e2e` and `pnpm build` were re-verified after
  the fix.
- **`DSV2-006`'s CI job runs on `macos-latest`**, not the rest of the suite's `ubuntu-latest`: the
  committed visual-regression baseline was generated on macOS (this project's dev platform, and no
  Docker was available in the execution environment to produce a pinned Linux baseline instead).
  Free either way since `miren-prjcts/figma-to-code` is a public repository — GitHub Actions minutes
  are unlimited on every runner OS for public repos, so this is a platform-matching choice, not a
  cost one. See `docs/VISUAL_REGRESSION.md`.

Full verification re-run at the integration point (not just per-ticket): `pnpm typecheck`,
`pnpm lint`, `pnpm test` (91/91), `pnpm build` (`@repo/storybook` + `@repo/web`), `pnpm test:e2e`
(1/1), and `pnpm test:visual` (156/156, baseline updated to cover every Phase 0/1 story) all passed
via `turbo`, run directly through `corepack pnpm` per the pinned-pnpm-version Lesson. `DSV2-009`
(Figma motion parity), `DSV2-010` (Phase 0 review), `DSV2-015` (Figma Phase 1 form-core parity), and
`DSV2-016` (Phase 1 review) remain the next steps, per `docs/tickets/README.md`'s sequencing.
