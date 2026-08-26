# DSV2-007 — Component State Parity in Figma

## Dependency

`DSV2-001`, `DSV2-002`, and `DSV2-004` are integrated. Figma work is serialized through the primary agent.

## Objective

Represent the interactive states that already exist in code — and now in Figma's token/variable layer — as inspectable variant states on the Button, StatCard, and Modal component sets, so a designer can see hover/pressed/disabled/loading appearance without reading code.

## Background

A live audit on 2026-08-26 found:

- **Button** (`COMPONENT_SET`, `variant × size`, 6 variants + boolean `loading`): no hover, pressed, or disabled representation.
- **Input** (`COMPONENT_SET`, `state` = default/disabled/readOnly/invalid): already complete — no work needed.
- **Badge**: no interactive states in code; nothing to add.
- **StatCard** (single `COMPONENT`, zero variants): no representation of the optional action, its hover/disabled state, or the `--size-target-min` hit area added in `DSV2-002`.
- **Modal** (single `COMPONENT`, zero variants): no representation of its action-button states (default/disabled/loading) or close-button visibility.

The same audit found and removed two stale Figma pages (`Components / DS v1 Staging` and `Archive / DS v1 Legacy`) per explicit user approval — recorded in `ISSUES.md`, not part of this ticket's scope.

## Scope

- Add `hover` and `pressed` as boolean or variant properties to the Button component set, bound to the `--primary-hover`/`--primary-pressed` (solid) and existing `muted`/`secondary` (outline/ghost) roles already used in code. Add a `disabled` state consuming `--opacity-disabled`.
- Convert StatCard to a component set with variants/properties covering: no action / action default / action hover / action disabled, with the action's hit area bound to `--size-target-min` (matches the code shipped in `DSV2-002`).
- Convert Modal to a component set or add component properties covering: primary/secondary action `default`/`disabled`/`loading`, and `showCloseButton` on/off — matching `ModalActionButton`'s `ModalActionState` type and `ModalProps` in `packages/ui/src/components/modal.tsx`.
- Build and validate on a temporary staging page before touching the canonical `Components` page, following the `DSV1-006` staged-replacement precedent — this ticket converts two components from `COMPONENT` to `COMPONENT_SET`, a structural change.
- Update the five `*/Documentation` frames' state-matrix text to reflect the new inspectable states.

## Deliberate exclusions

- No new component-local tokens — every new state must consume a token that already exists (verified in `DSV2-004`'s parity pass).
- No change to any component's public code API.
- No `selected` state (still no consumer — see `DESIGN_SYSTEM_CHARTER.md` §5).
- No work on Foundations pages or other components.

## Acceptance criteria

- Button, StatCard, and Modal each expose their code-level interactive states as inspectable Figma variants/properties.
- Every new variant's visual values trace to an existing Figma Variable (no new raw color/size values introduced).
- Staged work is validated (metadata + screenshot) before cutover to the canonical `Components` page.
- Documentation frames are updated to match.
- No existing instance of StatCard or Modal elsewhere in the file is broken by the `COMPONENT` → `COMPONENT_SET` conversion (checked before cutover).

## Handoff

Report the state matrix per component, before/after screenshots, and confirm no other page references the old single-component IDs before they're replaced.
