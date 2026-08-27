# DSV2-013 — IconButton, Button size=lg and destructive Variant

## Objective

Harden Button with the two gaps the 2026-08-27 audit found missing, and add IconButton as its
icon-only sibling, both named in `BACKLOG.md`'s Phase 1 scope.

## Scope

- **Button**: add `size: "lg"` to the existing `sm`/`md` scale in `buttonVariants`
  (`button.tsx`), adding `--size-control-lg` to the token contract alongside the existing
  `--size-control-sm`/`--size-control-md`. Add a `destructive` variant (solid). Verify whether the
  existing soft `--destructive-surface`/`--destructive-foreground` tokens are contrast-appropriate
  for a solid button fill before reusing them; if not, add a named `--destructive`/
  `--destructive-hover`/`--destructive-pressed` state-role set explicitly (per Charter §3.3), do not
  repurpose the soft status tokens without checking contrast.
- **IconButton**: a single-icon variant sharing Button's variant/size/state system (solid/outline/
  ghost × sm/md/lg × default/loading/disabled). Requires an accessible name via a required
  `aria-label` prop enforced at the type level (no visible label exists to derive one from).
  `--size-target-min` hit area at `sm`, inset so the icon's rendered position is unchanged — the same
  pattern StatCard's overflow action already uses.

## Deliberate exclusions

- Any Button variant beyond `destructive`; icon-button groups or toggle groups.
- FormField, Checkbox, Radio, Switch, Select, Textarea — scoped to `DSV2-011`/`DSV2-012`.

## Acceptance criteria

- `lg` size and `destructive` variant are covered in the existing Button Storybook stories and test
  suite (`button.test.tsx`).
- IconButton's `aria-label` is required at the type level (a TypeScript error results if omitted);
  its `sm` size meets the 44px minimum target with the icon's visual position unchanged.
- No new raw color; any new token added for `destructive` is named and documented per Charter §3.3.
- Typecheck, lint, formatting, relevant unit/a11y tests, and production build pass.

## Handoff

Report the exact token(s) added for `destructive` and their contrast rationale, IconButton's
accessible-name enforcement mechanism, and verification evidence.
