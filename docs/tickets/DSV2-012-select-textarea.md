# DSV2-012 — Select, Textarea

## Objective

Add the remaining two Phase 1 form controls, extending Input's existing visual contract and
consuming the FormField wrapper from `DSV2-011`.

## Scope

- **Textarea**: same visual contract as Input (border/background/focus/invalid/disabled via the
  existing `aria-invalid` convention), consuming FormField for label/description/error. Auto-resize
  is in scope only if it can be done without a new runtime dependency; otherwise a fixed-rows
  default is acceptable and should be stated as a deliberate exclusion, not left implicit.
- **Select**: a native `<select>`-based component (a styled wrapper around the real native element),
  not a custom-rendered listbox. This is a deliberate scope boundary per Charter §4's "a single
  correct API exists today" test — a custom listbox/combobox has an open-ended API (search,
  multi-select, async options) that `BACKLOG.md` already names as deferred until product-driven
  discovery. Consumes FormField for label/description/error.

## Deliberate exclusions

- Multi-select, async options, combobox/autocomplete, and any custom-rendered popover listbox — all
  named as deferred in `BACKLOG.md`'s "Deferred until product-driven discovery" list. Select in this
  ticket is native-`<select>`-only.
- FormField, Checkbox, Radio, Switch, IconButton, and Button hardening — scoped to `DSV2-011` and
  `DSV2-013`.

## Acceptance criteria

- Select's keyboard model is verified as the browser's native behavior (not assumed) — typing to
  jump options, Arrow keys, Escape all work because the element is a real `<select>`.
- Invalid/disabled states on both components match Input's existing visual language exactly (same
  token roles, same `aria-invalid` convention).
- FormField wiring is verified against the API `DSV2-011` reported; any drift from that API is
  flagged in the handoff for the primary agent to reconcile before Figma work, not silently
  resolved.
- Typecheck, lint, formatting, relevant unit/a11y tests, and production build pass.

## Handoff

Report the FormField consumption pattern actually used (confirm or flag drift against `DSV2-011`'s
reported API), the native-Select scope boundary as delivered, and verification evidence.
