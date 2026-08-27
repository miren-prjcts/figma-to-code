# DS v1 Component Contracts — Execution Batch

These tickets implement the approved DS v1 plan. They are **not** execution authorization. Work starts only after the user approves this batch and its model assignments.

## Sequencing

1. `DSV1-001`, `DSV1-002`, and `DSV1-003` may run in separate worktrees concurrently.
2. The primary agent reviews and integrates the verified code contracts.
3. `DSV1-004` performs serialized Figma work from the integrated code APIs.
4. `DSV1-005` performs the final supervisor review, records verified outcomes, and creates the local integration commit if it is within the approved execution scope.

No ticket may introduce a Figma-only property, raw color value, primitive color consumption, or a component outside its defined scope.

| Ticket                                               | Scope                                                        | Proposed owner               | Proposed reasoning |
| ---------------------------------------------------- | ------------------------------------------------------------ | ---------------------------- | ------------------ |
| [DSV1-001](DSV1-001-button-input.md)                 | Button and Input code contracts                              | `gpt-5.6-sol`                | high               |
| [DSV1-002](DSV1-002-badge-stat-card.md)              | Badge and StatCard code contracts                            | `gpt-5.6-terra`              | high               |
| [DSV1-003](DSV1-003-modal.md)                        | Modal dialog contract                                        | `gpt-5.6-sol`                | xhigh              |
| [DSV1-004](DSV1-004-figma-parity.md)                 | Serialized Figma component construction and documentation    | primary agent, `gpt-5.6-sol` | xhigh              |
| [DSV1-005](DSV1-005-supervisor-review.md)            | Integration, verification, records, and local commit         | primary agent, `gpt-5.6-sol` | high               |
| [DSV1-006](DSV1-006-figma-controlled-replacement.md) | Staged Figma component-set replacement and parity validation | primary agent, `gpt-5.6-sol` | xhigh              |
| [DSV1-007](DSV1-007-pnpm-runtime-alignment.md)       | pnpm runtime/config alignment and verification recovery      | `gpt-5.6-terra`              | high               |

## Shared verification baseline

- Typecheck, relevant unit and accessibility tests, formatting, and production build.
- Storybook stories for public variants and meaningful states.
- Semantic-token-only implementation, with no raw colors or primitive-token use in components.
- Figma property and static-state parity only after the code API is integrated and verified.
- Record any check blocked by the managed `pnpm` build-script policy with its command output and do not represent it as passing.

## DS v2 — Reusable Starter Foundations

This batch implements the user-approved direction for a product-agnostic reusable starter. DSV2-001–004 are complete. DSV2-007 was corrected twice — first by [DSV2-007-C](DSV2-007-correction-icon-state-parity.md) (icon sourcing, Modal Boolean properties), then by [DSV2-007-D](DSV2-007-D-loading-structure-correction.md) (an independent audit found DSV2-007-C's Button/Modal loading-state claim was itself incomplete) — and is now closed. DSV2-005's supervisor review and DSV2-006 remain the next approval points.

## Sequencing

1. `DSV2-001` establishes the semantic contract.
2. `DSV2-002` consumes that contract to harden the existing components; `DSV2-003` may proceed in parallel after the contract is stable enough to document.
3. `DSV2-004` is serialized through the primary agent after reviewed code integration and completed `DSV1-006` staged replacement.
4. `DSV2-005` reviews verified outcomes and records the next approval point.
5. `DSV2-007` (through its `-C` and `-D` corrections) closes inspectable Figma states and supplies its evidence to the DSV2-005 review.
6. `DSV2-006` runs only after DSV2-005 and DSV2-007-D are complete, so its baseline screenshots capture the reviewed, hardened component states.

| Ticket                                                      | Scope                                                                                                                                                                                                                               | Proposed owner               | Proposed reasoning |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------ |
| [DSV2-001](DSV2-001-semantic-token-contract.md)             | Semantic state tokens, compact foundation scales, and theme mapping                                                                                                                                                                 | `gpt-5.6-sol`                | xhigh              |
| [DSV2-002](DSV2-002-interaction-accessibility-hardening.md) | Existing-component accessibility and state hardening                                                                                                                                                                                | `gpt-5.6-terra`              | high               |
| [DSV2-003](DSV2-003-system-documentation-governance.md)     | Charter, extension rules, Figma/code checklist, lifecycle — see [Design System Charter](../DESIGN_SYSTEM_CHARTER.md), [Component Lifecycle](../COMPONENT_LIFECYCLE.md), [Figma/Code Parity Checklist](../FIGMA_PARITY_CHECKLIST.md) | `gpt-5.6-terra`              | high               |
| [DSV2-004](DSV2-004-figma-foundation-parity.md)             | Serialized Figma foundation parity                                                                                                                                                                                                  | primary agent, `gpt-5.6-sol` | xhigh              |
| [DSV2-005](DSV2-005-supervisor-review.md)                   | Integration and records — reopened pending DSV2-007-D                                                                                                                                                                               | primary agent, `gpt-5.6-sol` | high               |
| [DSV2-007](DSV2-007-component-state-parity.md)              | Superseded by the icon/state-parity correction                                                                                                                                                                                      | primary agent, `gpt-5.6-sol` | xhigh              |
| [DSV2-007-C](DSV2-007-correction-icon-state-parity.md)      | Serialized correction: actual icons, readable states, controlled Modal replacement — its own loading-state claim was later corrected by DSV2-007-D                                                                                  | primary agent, `gpt-5.6-sol` | xhigh              |
| [DSV2-007-D](DSV2-007-D-loading-structure-correction.md)    | Independent-audit correction: Button `loading` boolean never hid the label (spinner rendered on top of it); converted to a 5th `state` variant (30 variants) and fixed a pre-existing icon-visibility binding gap                   | primary agent                | high               |
| [DSV2-006](DSV2-006-playwright-visual-regression.md)        | Self-hosted Playwright/Storybook visual-regression harness, rescoped 2026-08-27 to start alongside Phase 1 instead of after it (`vitest-axe` split out to its own ticket, `DSV2-014`)                                               | `general-purpose` (Claude)   | high               |

## Phase Plan — Phase 0: Motion, Elevation, and Layering Foundation (proposed 2026-08-27, not yet approved)

Implements the Phase 0 row of `BACKLOG.md`'s Phase Plan. Independent of Phase 1 — either may start
first, and, per the 2026-08-27 owner-reassignment decision below, alongside it: the user explicitly
raised the Golden Pact's five-active-agent cap to six for this batch, on the condition that every
non-primary-agent owner is a Claude agent (not a GPT-family one) and that the primary agent
(this session) supervises all of them directly. See `DECISIONS.md`.

## Sequencing

1. `DSV2-008` is a single code track (motion/elevation/layer tokens plus Modal's transition) — no
   internal parallelism proposed, since Modal's transition depends on the same duration/easing
   tokens the rest of the ticket defines.
2. `DSV2-009` is serialized through the primary agent after `DSV2-008` is integrated and reviewed.
3. `DSV2-010` reviews verified outcomes and names the next approval point (Phase 2, which depends on
   these tokens per `BACKLOG.md`).

| Ticket                                                   | Scope                                                                            | Proposed owner             | Proposed reasoning |
| -------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------- | ------------------ |
| [DSV2-008](DSV2-008-motion-elevation-layering-tokens.md) | Motion/elevation/z-index token contract; Modal enter/exit transition             | `general-purpose` (Claude) | xhigh              |
| [DSV2-009](DSV2-009-figma-motion-foundation-parity.md)   | Serialized Figma `Foundations / Motion` page; elevation/layer/icon-source parity | primary agent              | xhigh              |
| [DSV2-010](DSV2-010-phase0-supervisor-review.md)         | Phase 0 integration, verification, records, and review gate                      | primary agent              | high               |

## Phase Plan — Phase 1: Universal Form Core (proposed 2026-08-27, not yet approved)

Implements the Phase 1 row of `BACKLOG.md`'s Phase Plan. Independent of Phase 0 per that table, and
may now run fully concurrently with it: five parallel code/tooling tracks here
(`DSV2-011`, `DSV2-012`, `DSV2-013`, `DSV2-006`, `DSV2-014`) plus Phase 0's `DSV2-008` is six active
agents at once, explicitly approved 2026-08-27 (see `DECISIONS.md`) in place of the original
five-agent cap and the DSV2-006/vitest-axe merge that cap had forced.

## Sequencing

1. `DSV2-011`, `DSV2-012`, and `DSV2-013` may run concurrently once FormField's proposed API
   (`DSV2-011`'s handoff) is available for `DSV2-012` to consume — `DSV2-012` should start slightly
   after `DSV2-011` or reconcile drift explicitly in its own handoff, per its Deliberate exclusions.
2. `DSV2-006` (Playwright) and `DSV2-014` (vitest-axe) each start immediately alongside the three
   component tracks — neither waits for the other, per their independent Dependency sections — and
   both extend incrementally as each component lands.
3. `DSV2-015` is serialized through the primary agent after `DSV2-011`–`013` are integrated and
   reviewed.
4. `DSV2-016` reviews verified outcomes, confirms full Phase 1 coverage in `DSV2-006`'s and
   `DSV2-014`'s harnesses, and names the next approval point (Phase 2, gated on Phase 0).

| Ticket                                                  | Scope                                                                           | Proposed owner             | Proposed reasoning |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------- | ------------------ |
| [DSV2-011](DSV2-011-formfield-checkbox-radio-switch.md) | FormField wrapper; Checkbox, Radio (+RadioGroup), Switch                        | `general-purpose` (Claude) | high               |
| [DSV2-012](DSV2-012-select-textarea.md)                 | Select (native), Textarea — consumes FormField                                  | `general-purpose` (Claude) | xhigh              |
| [DSV2-013](DSV2-013-iconbutton-button-hardening.md)     | IconButton; Button `size=lg` and `destructive` variant                          | `general-purpose` (Claude) | high               |
| [DSV2-006](DSV2-006-playwright-visual-regression.md)    | Playwright visual-regression harness, started alongside Phase 1                 | `general-purpose` (Claude) | high               |
| [DSV2-014](DSV2-014-vitest-axe-integration.md)          | vitest-axe integration, started alongside Phase 1                               | `general-purpose` (Claude) | high               |
| [DSV2-015](DSV2-015-figma-phase1-form-core-parity.md)   | Serialized Figma `Components / Forms` page and Button `lg`/`destructive` parity | primary agent              | xhigh              |
| [DSV2-016](DSV2-016-phase1-supervisor-review.md)        | Phase 1 integration, verification, records, and review gate                     | primary agent              | high               |
