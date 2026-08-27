# DSV2-008 — Motion, Elevation, and Layering Token Contract

## Objective

Extend the foundation token contract with motion timing, a real elevation scale, and an expanded
z-index/layer scale, then give Modal an enter/exit transition driven by the new tokens. This closes
the Phase 0 gap named in `BACKLOG.md`'s Phase Plan: today the contract has a single `--layer-overlay`
role and a single `--effect-shadow-soft` elevation value, and Modal has no exit animation at all — it
unmounts the instant `open` becomes `false`.

## Scope

- Add theme-invariant motion tokens to `packages/tokens/src/tokens.css`: `--duration-fast`,
  `--duration-base`, `--duration-slow`, and `--easing-standard`, `--easing-decelerate`,
  `--easing-accelerate` (or the equivalent minimal set the actual consumers need — do not add an
  easing/duration pair with no named consumer, per Charter §3.3/§5).
- Expand the elevation scale beyond the single `--effect-shadow-soft`: name additional tiers
  consistent with the existing `--effect-shadow-*` prefix, with distinct Light and Dark values.
  Decide explicitly whether `shadow-soft` becomes an alias for one tier or is retired in favor of
  the new names — do not leave two parallel elevation systems in the file.
- Expand `--layer-*` beyond `--layer-overlay`: add only roles with a present consumer (Modal) or an
  explicitly named near-term one from `BACKLOG.md`'s Phase 2 scope (Dropdown Menu, Toast, Tooltip,
  Popover) — document each addition's consumer per Charter §5's table format.
- Give Modal a real enter/exit transition (backdrop opacity + dialog surface opacity/scale or
  translate) driven by the new duration/easing tokens. This requires an explicit
  open → entering → entered → exiting → closed state machine so the dialog stays mounted for the
  exit transition's duration instead of the current immediate `if (!open) return null`.
- Respect `prefers-reduced-motion`: both transitions collapse to instant with no motion, matching
  Button's existing `motion-reduce:animate-none` precedent.
- Update Storybook token stories to demonstrate the new motion/elevation scale in both themes, and
  add a Modal story that exercises the exit transition.

## Deliberate exclusions

- New components and any other component's transition — Phase 2/3 components are out of scope here.
- A general-purpose animation/transition utility or dependency — the Modal transition stays
  hand-rolled, consistent with Modal's existing no-runtime-dependency contract.
- Any `--layer-*` role for a component that has not passed Charter §4's component-selection test.
- Any Figma mutation — this ticket is code-only; `DSV2-009` handles Figma parity after integration.

## Acceptance criteria

- Every new token documents its value (Light/Dark, or theme-invariant) and at least one present or
  explicitly named near-term consumer.
- Modal has an inspectable enter transition and exit transition in Storybook; `prefers-reduced-motion:
reduce` makes both instant.
- No raw duration, easing, box-shadow, or z-index literal remains in component source outside the
  new tokens.
- Typecheck, lint, formatting, relevant unit/a11y tests, and production build pass; a
  managed-environment blocker is recorded verbatim rather than represented as a pass.

## Handoff

Report the full token matrix (motion, elevation, layer) with each role's consumer, Modal's
transition implementation and reduced-motion behavior, and any Figma-parity implication for
`DSV2-009`.
