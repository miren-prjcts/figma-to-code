# DSV2-007 — Component State Parity in Figma

## Execution package — approved plan (2026-08-26)

**Status:** Complete (2026-08-26). The verified handoff is recorded in
[`DSV2-005-007-handoff.md`](DSV2-005-007-handoff.md).

**Owner and reasoning:** primary agent, `gpt-5.6-sol`, xhigh. The work mutates a
single shared Figma library and includes a known Plugin API defect, so it must be
serial and supervised rather than delegated or performed in parallel worktrees.

**Execution order:**

1. Inspect Button variants `69:11`, `69:16`, `69:21`, `69:26`, `69:31`, and
   `69:36`. If the `Foundation/disabled` opacity binding reads back as `0.005`,
   remove that binding and assign the verified literal `0.5`; otherwise retain
   the correct existing value. Record the result as a documented Plugin API
   workaround, not as a token change.
2. Convert Modal (`53:2`) to an inspectable state representation without
   changing its public code contract: swap the existing primary/secondary
   Button instances (`53:15`, `53:10`) to their new Button state variants;
   expose default, disabled, and loading action appearances; and expose
   `showCloseButton` on/off. Reuse the existing Button instances, variables,
   and component properties rather than rebuilding action visuals.
3. Update the current Button and Stat Card documentation frames (`59:6`,
   `59:24`) so their state matrices match the component sets. The current
   approved scope is two frames; the older reference to five frames elsewhere
   in this ticket is superseded.
4. Validate component metadata, variable bindings, instance integrity, and a
   combined `Components`-page screenshot. Check specifically that the Modal
   conversion did not break existing instances.
5. Run the DSV2-005 supervisor review against the completed DSV2-001–004 and
   DSV2-007 evidence; update `PROJECT_OPERATIONS.md`, `BACKLOG.md`,
   `ISSUES.md`, and any durable decision/lesson records only with verified
   facts. Produce the DSV2-005/007 handoff report. Do not start DSV2-006.

**Scope limits:** no source-code/API change, new token, Figma staging page,
archive deletion, commit, push, or DSV2-006 implementation. The current
Components page is the approved direct-build location: Button and StatCard were
already safely converted there, and reopening a staging/cutover path would add
unnecessary structural risk.

**Completion evidence:** read-back opacity values for all six Button disabled
variants; Modal property/variant inspection and screenshot; updated
documentation-frame text; a final Components screenshot; and the concise
DSV2-005/007 report with exact verification outcomes and residual API risk.

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

**Completed:** StatCard has 4 action variants, and Modal has 9 independent
action-state combinations while retaining the optional-secondary and
close-button Boolean properties. Metadata, visual evidence, cross-page
instance inspection, and the current integration checkout are recorded in the
linked handoff. Button's variant count was originally recorded as 24; this
undercounted the structure needed for a correct `loading` state and was
corrected to 30 (`variant × size × state`, with `loading` as a 5th `state`
value) under
[`DSV2-007-D`](DSV2-007-D-loading-structure-correction.md).
