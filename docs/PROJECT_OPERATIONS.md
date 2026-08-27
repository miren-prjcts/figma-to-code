# Project Operations

## Golden workflow

1. Discuss the goal with the appropriate senior-level expertise.
2. Agree on the most efficient approach.
3. Present a plan and wait for approval.
4. Create detailed tickets and propose model assignments; wait for approval again.
5. Execute with at most five active agents, supervised by the primary agent.
6. Review evidence, report verified results, update these records, and propose the next steps.

Tickets are planning artifacts, not authorization to begin work. Execution requires an explicit user approval after ticket review.

## Current product scope

This is the only repository for the project: `miren-prjcts/figma-to-code`. The former `ds-starter` repository is out of scope.

The code-backed Figma file is:

<https://www.figma.com/design/jiDhe0OZzNgiDbc3Z9Hh5n/figma-to-code?node-id=0-1>

## Current state — 2026-08-26

- Design-system foundations are complete in Figma: local Color, Spacing, Size, Radius, and Typography variables; Geist styles; Light/Dark semantic colors; foundations documentation.
- The source repository has local commit `8d8faf2` (`feat: establish design system v1 foundations`).
- DS v1 code contracts for Button, Input, Badge, StatCard, and Modal are integrated locally. DSV1-006 structurally replaced the five Figma component sets and cut them over to the canonical `Components` page (`6:8`) after user visual-checkpoint approval; the legacy and temporary staging pages were subsequently purged with explicit user approval. The current DSV2-007-C work remains the acceptance gate for interaction-state and icon parity.
- The DS v1 component-contract execution batch is documented in `docs/tickets/`.
- DSV1-007 aligned the repository with pnpm `9.15.4` and removed pnpm-11-generated build-script placeholders. A full frozen install and verification suite (typecheck, 32/32 tests, lint, build) passed cleanly; see `docs/ISSUES.md` for the exact evidence and the earlier transient registry-access failure it superseded.
- The user approved an execution plan covering the full DSV2-001–006 batch (semantic tokens, accessibility hardening, documentation/governance, Figma foundation parity, supervisor review, and a Playwright visual-regression harness) on 2026-08-26. DSV2-001–004 are complete. Visual review invalidated the prior DSV2-007 state-parity handoff: Modal's matrix was not a valid state representation and did not use the actual code icons; DSV2-007-C corrected icon sourcing and Modal's Boolean-property structure. A further independent audit then found DSV2-007-C's Button/Modal loading-state completion claim itself did not hold up (the `loading` boolean never hid the label, so the spinner rendered on top of it) — corrected under DSV2-007-D, which also converted `loading` into a 5th Button `state` variant (30 variants) and fixed a pre-existing `leadingIcon`/`trailingIcon` visibility-binding gap on 18 leaves. DSV2-007 is now fully closed; DSV2-005's supervisor review and DSV2-006 remain the next approval points.
- `origin/main` was 7 commits behind local `main` for part of this session (all of DS v1's work was local-only); it has since been pushed and kept in sync after each integrated wave. See `docs/LESSONS.md`'s 2026-08-26 worktree-isolation entry for why this mattered.
- Figma component work must be code-contract-first and serialized through the primary agent. `DSV2-004` added variables only — it did not modify any component set, per its scope.

## Current state — 2026-08-27

- Phase 0 (`DSV2-008`) and Phase 1 (`DSV2-006`, `DSV2-011`–`DSV2-014`) code tracks ran as six
  parallel worktree-isolated agents and are now integrated into `main`'s working tree, verified at
  the integration point (not just per-ticket): full root-level `typecheck`/`lint`/`test`
  (91/91)/`build` via `turbo`, plus `test:e2e` and `test:visual` (156/156, baseline updated). See
  `DECISIONS.md`'s 2026-08-27 "Phase 0/1 code integration" entry for the file-ownership
  reconciliation decisions and the one new defect found and fixed during integration (a Next.js
  dev-mode RSC barrel-import issue, unrelated to any single ticket's own scope).
- `packages/ui` now also exports FormField, Checkbox, Radio, RadioGroup, Switch, Select, Textarea,
  and IconButton, alongside the original Badge/Button/StatCard/Input/Modal. Button gained `size=lg`
  and a `destructive` variant; Modal gained a token-driven enter/exit transition.
- `DSV2-006`'s self-hosted Playwright visual-regression harness and `DSV2-014`'s `jest-axe`
  integration are both wired into `packages/ui`'s verification suite and CI.
- Next: `DSV2-009` (serialized Figma `Foundations / Motion` parity, after `DSV2-008`), `DSV2-010`
  (Phase 0 supervisor review), `DSV2-015` (serialized Figma `Components / Forms` parity, after
  `DSV2-011`–`013`), and `DSV2-016` (Phase 1 supervisor review) — all primary-agent work, per
  `docs/tickets/README.md`'s sequencing.

## Verification standard

Each implementation ticket must define and meet proportionate checks:

- Typecheck, relevant unit/accessibility tests, formatting, and production build.
- Storybook stories for variants and meaningful states.
- Semantic-token-only implementation.
- Figma property and state parity with final code API.
- Documentation of deliberate exclusions and unresolved gaps.
