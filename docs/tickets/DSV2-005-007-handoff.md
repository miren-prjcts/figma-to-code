# DSV2-005 / DSV2-007 — Verified Handoff

**Date:** 2026-08-26  
**Status:** complete — corrected and verified on 2026-08-26. The rejected
initial state representation was replaced under
[`DSV2-007-C`](DSV2-007-correction-icon-state-parity.md).

**Correction note (2026-08-26):** the claim below that "every loading state
uses a real nested CircleNotch Figma icon" for Button was not accurate —
the master's `loading` boolean was bound only to the spinner's visibility,
never to hiding the label, so the two rendered on top of each other. See
[`DSV2-007-D`](DSV2-007-D-loading-structure-correction.md) for the verified
root cause and fix.

## Delivered

- Button (`32:32`) exposes 24 `variant × size × state` variants. Every loading
  state uses a real nested `CircleNotch` Figma icon; all six disabled variants
  read back at literal opacity `0.5`.
- StatCard (`70:24`) exposes `action = none/default/hover/disabled`; the action
  is a nested `DotsThreeVertical` icon, including the muted, foreground-hover,
  and disabled treatments from code.
- Modal (`85:44`) keeps its real content and Boolean API: title, description,
  `showCloseButton`, `closeButtonLabel`, and `secondaryAction` (default false).
  Its close control is a nested `X` icon. Independent action-state examples are
  labelled in `Modal / State specimens` (`89:59`) rather than encoded as invalid
  parent variants.
- `Icon assets / Documentation` (`93:91`) presents the three installed Phosphor
  mappings. Button, StatCard, and Modal documentation frames are current.

## Evidence

- Figma metadata validated 24 Button variants, four StatCard action states,
  Modal's six code-backed properties, icon main-component links, and all six
  Button disabled opacities.
- Per-component documentation and final Modal state-specimen screenshots show
  real icons, right-aligned close controls, labelled disabled actions, and
  16 px loading icon-to-label spacing.
- The invalid Modal set `73:142` is absent from the canvas; document-wide scans
  found no external Modal instances to break.

## Supervisor verification

Executed directly through `corepack pnpm` 9.15.4 on the integration checkout,
without Turbo cache replay:

- `corepack pnpm --filter @repo/ui typecheck` passed;
- `corepack pnpm --filter @repo/ui test` passed: 5 files / 33 tests;
- `corepack pnpm --filter @repo/ui lint` passed.

No production source changed in this correction. The earlier full UI,
Storybook, and web typecheck/lint/build evidence remains recorded in
`docs/ISSUES.md`; it was not falsely represented as rerun here.

## Residual limitation

Figma Plugin API `setBoundVariable("opacity", Foundation/disabled)` resolves the stored `0.5` token as approximately `0.005` on FRAME/COMPONENT nodes. The six Button disabled variants and StatCard's disabled action use the documented literal `0.5` workaround; no token or code API changed.

## Next approval point

`DSV2-006` remains planned and requires its own plan and execution approval.
