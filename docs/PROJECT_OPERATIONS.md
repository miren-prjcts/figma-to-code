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
- DS v1 code contracts for Button, Input, Badge, StatCard, and Modal are integrated locally, and Figma parity is complete: DSV1-006 staged all five components on a dedicated staging page, validated metadata/screenshots/Light-Dark bindings, and — after user visual-checkpoint approval — cut them over to the canonical `Components` page (`6:8`). The five legacy component sets (which could not expose property definitions through the plugin API) were archived, not deleted: renamed with an `ARCHIVED (2026-08-26)` prefix and moved to page `Archive / DS v1 Legacy (pre-2026-08-26)`, preserving their original node IDs and paired documentation frames.
- The DS v1 component-contract execution batch is documented in `docs/tickets/`.
- DSV1-007 aligned the repository with pnpm `9.15.4` and removed pnpm-11-generated build-script placeholders. A full frozen install and verification suite (typecheck, 32/32 tests, lint, build) passed cleanly; see `docs/ISSUES.md` for the exact evidence and the earlier transient registry-access failure it superseded.
- Follow-on work (DS v2 and later) is ticketed only and remains pending approval.
- Figma component work must be code-contract-first and serialized through the primary agent.

## Verification standard

Each implementation ticket must define and meet proportionate checks:

- Typecheck, relevant unit/accessibility tests, formatting, and production build.
- Storybook stories for variants and meaningful states.
- Semantic-token-only implementation.
- Figma property and state parity with final code API.
- Documentation of deliberate exclusions and unresolved gaps.
