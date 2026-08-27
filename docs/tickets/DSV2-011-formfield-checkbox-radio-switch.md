# DSV2-011 — FormField, Checkbox, Radio, Switch

## Objective

Add the shared form-field wrapper and the three binary/selection controls that consume it, as part
of the Phase 1 universal form core named in `BACKLOG.md`.

## Scope

- **FormField**: a layout/accessibility wrapper providing label, optional description, optional
  error message, and a required-field indicator, with automatic `id`/`aria-describedby`/
  `aria-invalid` wiring to a single form-control child — extending Input's existing `aria-invalid`
  convention (`isAriaInvalid` in `input.tsx`), not inventing a parallel one.
- **Checkbox**: checked / unchecked / indeterminate / disabled / invalid states. Indeterminate is
  imperative-only (native `input.indeterminate`), matching the platform convention, and is exposed
  via `aria-checked="mixed"`. `--size-target-min` hit area, `focus-visible` ring, semantic tokens
  only.
- **Radio** with a `RadioGroup` context: checked / unchecked / disabled / invalid states, roving
  `tabindex` and Arrow-key navigation within the group per the WAI-ARIA `radiogroup` pattern (the
  group is one Tab stop, not one per radio).
- **Switch**: on / off / disabled states, `role="switch"`, Space/Enter toggles.
- All three consume FormField for label/description/error. Storybook stories demonstrate both
  standalone control usage and FormField-wrapped usage.

## Deliberate exclusions

- Select, Textarea, IconButton, and Button hardening — scoped to `DSV2-012` and `DSV2-013`.
- No new token role beyond DSV2-001's existing hover/pressed/focus/disabled/invalid state model,
  unless a real gap is found while implementing — if so, name the gap explicitly in the handoff
  rather than adding an ad hoc value silently (Charter §3.2/§4 rule 3).

## Acceptance criteria

- Checkbox: Space toggles; indeterminate is settable and reads back correctly via
  `aria-checked="mixed"`.
- RadioGroup: Arrow keys move focus and selection together; Tab enters/exits the group as a single
  stop.
- Switch: Space/Enter toggles; `role="switch"` with correct `aria-checked`.
- Every state uses semantic tokens only — no raw color or primitive-token consumption.
- Storybook covers every public variant and state (including disabled, invalid, both themes).
- Typecheck, lint, formatting, relevant unit/a11y tests, and production build pass.

## Handoff

Report the FormField API (so `DSV2-012` consumes the same shape), the full state matrix for
Checkbox/Radio/Switch, any token gap found and left unresolved, and verification evidence.
