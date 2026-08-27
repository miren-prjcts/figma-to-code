# DSV2-007-C — Correct Icon and State Parity in Figma

## Status

**Complete — 2026-08-26.** The user approved this serialized correction. Its
metadata, screenshots, instance integrity, and direct package-script checks
are summarized in [`DSV2-005-007-handoff.md`](DSV2-005-007-handoff.md).

**Correction note (2026-08-26):** this ticket's Button/Modal loading-state
claims did not hold up under a later independent visual re-check — the
`loading` boolean never hid the label, so the spinner rendered on top of it.
See [`DSV2-007-D`](DSV2-007-D-loading-structure-correction.md) for the root
cause and the fix. The icon-sourcing and Modal Boolean-property work recorded
below remains accurate.

## Owner and reasoning

Primary agent, `gpt-5.6-sol`, xhigh. This is serialized shared-library work:
the correction replaces a known-invalid component set, needs exact code-to-icon
mapping, and must preserve the real code contract rather than infer a visual
approximation.

## Source of truth

The integrated code uses these actual icons from `@phosphor-icons/react`:

| Code usage                             | Figma asset       | Tokenized size   |
| -------------------------------------- | ----------------- | ---------------- |
| `CircleNotch` in Modal loading action  | `__Icon/Loading`  | `--size-icon-sm` |
| `X` in Modal close control             | `__Icon/Close`    | `--size-icon-sm` |
| `DotsThreeVertical` in StatCard action | `__Icon/Overflow` | `--size-icon-md` |

Text glyphs, text labels used as icon substitutes, and generic `Button` labels
are prohibited. The source vectors must come from the installed code dependency
and be reused as nested Figma instances.

## Correction scope

1. Audit Button's existing loading and icon-property structure before mutation.
   If it uses text placeholders or cannot render a real loading icon, correct
   that component set first using the internal icon assets above.
2. Build the three private, reusable vector icon components from the actual
   Phosphor source paths and present their mapping in component documentation.
3. Replace the invalid Modal set (`73:142`) through a controlled replacement:
   preserve the real content/Boolean properties, render `CircleNotch` and the
   correct `Confirm…`/`Cancel…` labels for loading, and never reset action
   labels to `Button`.
4. Represent independent primary and secondary action states without encoding a
   Cartesian product as parent Modal variants. Use labelled representative
   specimens with `secondaryAction=true`; the reusable Modal component keeps
   the code default `secondaryAction=false`.
5. Rebuild StatCard's action from the `DotsThreeVertical` instance and verify
   `none/default/hover/disabled` against its exact code styles. Hover and
   disabled must be visually distinguishable in the state specimen without
   adding a non-code visual treatment.
6. Update affected documentation, capture per-component and combined
   screenshots, and remove the bot-created invalid Modal set only after the
   replacement passes metadata, visual, and instance-integrity validation.

## Acceptance criteria

- Every visible close, loading, and overflow glyph is an actual vector icon
  sourced from the code dependency and reused as a Figma component instance.
- Button and Modal loading states visibly show `CircleNotch` plus the correct
  loading label; disabled retains the original action label.
- Modal state documentation makes independent primary/secondary action states
  readable while its reusable component retains code-default Boolean properties.
- StatCard's four action states use the real overflow icon and are distinguishable
  only through the code-backed visual contract.
- The invalid Modal set is absent after controlled replacement; no external
  Modal instance is broken.
- The completion record is restored only after exact metadata and screenshots
  validate the corrected components.

## Verification

- Figma metadata: properties, variant counts, vector-instance sources, and
  external-instance scan.
- Per-component screenshots at legible scale, then combined Components-page
  screenshot.
- Direct uncached package-script verification through `corepack pnpm`; do not
  use Turbo `--force` in this managed environment.

## Scope limits

No public code API, new token, commit, push, or DSV2-006 work. The three icon
components are private Figma implementation assets, not a new public icon API.

## Delivered evidence

- Private Figma assets map the installed `@phosphor-icons/react` regular paths:
  `__Icon/Loading` (`87:53`), `__Icon/Close` (`80:41`), and
  `__Icon/Overflow` (`83:41`). Their mapping is visible in
  `Icon assets / Documentation` (`93:91`).
- Button (`32:32`) retains 24 `variant × size × state` variants. Every loading
  appearance uses a nested loading-icon instance; the six disabled variants
  read back at literal opacity `0.5`.
- StatCard (`70:24`) retains `action = none/default/hover/disabled`; every
  action uses the nested overflow-icon instance and disabled reads at `0.5`.
- Modal (`85:44`) exposes the six code-backed properties. Its close control is
  a nested close-icon instance. `Modal / State specimens` (`89:59`) documents
  labelled default, disabled, and loading actions; close controls are
  right-aligned and loading icon-to-label spacing is 16 px.
- Invalid Modal set `73:142` is absent from the canvas. A parentless Plugin API
  tombstone remains addressable by ID, but page and document-wide scans find no
  live node or external Modal instance referencing it.
