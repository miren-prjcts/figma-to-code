# DSV2-007-D — Button Loading Structure Correction

## Status

**Complete — 2026-08-26.** Independent audit (not self-reported by the executing
agent) found and fixed a structural defect in Button's `loading` representation
that DSV2-007-C's completion claim had missed. Verified via Figma Plugin API
metadata reads and screenshots before and after the fix, not from documentation
alone.

## Why this ticket exists

DSV2-007-C recorded Button (`32:32`) and the Modal loading specimens as
complete. A visual re-check on 2026-08-26 found the Confirm/Cancel loading
specimens rendering with the spinner drawn on top of the label text
("Cⓞnfirm"-style corruption). Root-cause inspection via the Plugin API found:

- `loadingIndicator.componentPropertyReferences.visible` was bound to
  `loading#32:21`, but the `label` layer had **no complementary binding** to
  hide or dim itself. Figma has no boolean-invert binding for `visible`, so
  toggling `loading` made the spinner appear directly on top of the
  still-fully-visible label — on every Button variant, not a specimen-only
  issue.
- Modal's `ModalActionButton` (`packages/ui/src/components/modal.tsx:98-122`)
  does **not** use Button's `loading` prop at all. It renders `CircleNotch` +
  visible label as children while relying on native `disabled` for the 0.5
  dimming. This is a second, distinct code pattern from Button's own
  `loading` prop (which hides its label via `opacity-0` — see
  `packages/ui/src/components/button.tsx:67-89`). Toggling Button's `loading`
  boolean could never correctly represent Modal's actual rendering, regardless
  of how the boolean was structured.
- `leadingIcon`/`trailingIcon` were TEXT nodes containing literal arrow glyphs
  (`←`/`→`), not real vector icons — a violation of DSV2-007-C's own stated
  rule against text-glyph icon substitutes. This blocked the correct fix for
  the Modal specimens, which need a real inline icon.
- Independently discovered in the process: `leadingIcon#32:7` /
  `trailingIcon#32:14` were only wired to layer visibility on the 6
  `state=default` leaves. The other 18 pre-existing leaves (`disabled`,
  `hover`, `pressed`) had no visibility binding at all — a pre-existing gap,
  not introduced by this fix, uncovered while repairing the icon slots.

## Fix delivered

1. **Button (`32:32`)**: `loading` converted from a boolean to a 5th `state`
   variant value (`default · hover · pressed · disabled · loading`), giving
   **30 variants** (`3 variant × 2 size × 5 state`), not 24. Each `loading`
   leaf is cloned from its `disabled` sibling (preserving the literal `0.5`
   opacity workaround, which also matches code: `loading` sets the native
   `disabled` attribute, so `disabled:opacity-[var(--opacity-disabled)]`
   applies).

   **Revised same day, per explicit user direction:** the original fix hid
   the label and showed only a centered spinner (`opacity-0` content +
   absolute-centered spinner), directly mirroring the code at the time. The
   user asked for a leading spinner icon plus visible "Loading…" text
   instead. This required a matching code change, not a Figma-only tweak —
   see `packages/ui/src/components/button.tsx`: the content span (icon(s) +
   original label) is now hidden with `sr-only` (visually hidden, still
   exposed to assistive tech) instead of `opacity-0`, and a new
   `data-slot="button-loading-content"` span (`aria-hidden="true"`) renders a
   non-absolute spinner followed by literal "Loading…" text. This keeps the
   button's accessible name as the original label (e.g. "Save changes") per
   the user's explicit choice, while sighted users see the spinner + generic
   "Loading…" text. `button.test.tsx` updated to match; 33/33 tests,
   typecheck, and lint pass, plus `storybook`/`web` typecheck.

   In Figma, each `loading` leaf now hides its original `label` (`visible =
false`) and shows the `loadingIndicator` spinner as a normal (not
   absolute) leading flow item, followed by a new static "Loading…" text
   layer — not bound to the shared `label` property, since code hardcodes
   this text regardless of the button's original label. Each leaf's frame
   hugs its content width (`primaryAxisSizingMode = 'AUTO'`) instead of
   staying fixed at the grid's 120px column width, since "Loading…" content
   width legitimately differs from the original label's.

2. **`leadingIcon`/`trailingIcon`**: replaced the arrow-glyph TEXT placeholders
   with real tone-matched icon instances (`__Icon/Loading` tone=
   `primary-foreground` for `solid`, tone=`foreground` for `outline`/`ghost`)
   across all 30 leaves (60 node replacements), and wired
   `componentPropertyReferences.visible` to `leadingIcon#32:7` /
   `trailingIcon#32:14` on **every** leaf — closing the pre-existing binding
   gap on the 18 non-default leaves along the way.
3. **Modal loading specimens** (`98:71` "Confirm…", `98:86` "Cancel…"): kept on
   the Button `disabled` variant (correct — matches
   `disabled={state !== "default"}` in `ModalActionButton`), and now use the
   repaired `leadingIcon` slot to show the spinner inline before the label,
   instead of the old broken absolute-centered overlay. Label text updated to
   include the ellipsis Modal's default `loadingLabel` produces
   (`` `${label}…` ``).
4. Button and Modal documentation frames (`59:11`, `59:35`) updated to
   describe the corrected structure and the Button-vs-Modal loading
   distinction, so a designer doesn't reach for the wrong pattern.

## Verification

- Read back `buttonSet.componentPropertyDefinitions` after the change:
  `loading#32:21` is gone; `state.variantOptions` includes `loading`; 30
  children confirmed.
- Screenshots before/after: `32:32` (Button grid) row 5 shows a leading
  spinner plus visible "Loading…" text, hugging content width, no overlap;
  `89:59` (Modal / State specimens) shows "○ Confirm…" / "○ Cancel…" with no
  overlap.
- Document-wide instance scan (all pages, `findAllWithCriteria` on
  `INSTANCE`), re-run after the same-day revision: 99 instances on the
  `Components` page, zero broken (no null `mainComponent`), no external
  Button/Modal usage outside that page.
- `packages/ui`: `corepack pnpm --filter @repo/ui typecheck`, `test`
  (33/33), and `lint` all pass after the `button.tsx`/`button.test.tsx`
  change. `corepack pnpm --filter storybook typecheck` and
  `corepack pnpm --filter web typecheck` also pass (Storybook's
  `data-slot="button-spinner"` selector in `LoadingMotion` still matches the
  new markup; no story relied on the removed `opacity-0`/`absolute`
  classes).

## Scope limits

Component structure, instance overrides, and documentation text in Figma;
`packages/ui/src/components/button.tsx` and its test for the same-day
revision (Button's own `loading` prop rendering only — no change to its
public props, to `ModalActionButton`, or to any other component's API). No
new design token, no commit, no push.

## Relationship to prior tickets

Corrects a gap in [`DSV2-007-C`](DSV2-007-correction-icon-state-parity.md) and
its [handoff](DSV2-005-007-handoff.md), whose Button/Modal loading-state
claims were not accurate. Superseding note added to both files pointing here.
