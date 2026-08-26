# Design tokens → Figma Variables

How to mirror this starter's tokens into a Figma file, so design and code share one source of values. **Source of truth = `packages/tokens/src/tokens.css`** — the tables below must match it 1:1.

Palette: pure-neutral, `primary` inverts off-black ↔ off-white between modes, soft (tinted) status colors, Geist typeface.

---

## 1 · Tier 1 — neutral primitives (constants, no modes)

| Token      | Hex       |     | Token      | Hex       |
| ---------- | --------- | --- | ---------- | --------- |
| `gray-50`  | `#fafafa` |     | `gray-500` | `#737373` |
| `gray-100` | `#f5f5f5` |     | `gray-600` | `#525252` |
| `gray-200` | `#e5e5e5` |     | `gray-700` | `#404040` |
| `gray-300` | `#d4d4d4` |     | `gray-800` | `#262626` |
| `gray-400` | `#a3a3a3` |     | `gray-900` | `#171717` |
|            |           |     | `gray-950` | `#0a0a0a` |

## 2 · Tier 2 — semantic (modes: Light / Dark)

| Semantic               | Light      | Dark       |
| ---------------------- | ---------- | ---------- |
| `background`           | `#ffffff`  | `gray-950` |
| `foreground`           | `gray-950` | `gray-50`  |
| `card`                 | `#ffffff`  | `gray-900` |
| `card-foreground`      | `gray-950` | `gray-50`  |
| `muted`                | `gray-100` | `gray-800` |
| `muted-foreground`     | `gray-500` | `gray-400` |
| `border`               | `gray-200` | `gray-800` |
| `input`                | `gray-200` | `gray-800` |
| `ring`                 | `gray-950` | `gray-300` |
| `primary`              | `gray-950` | `gray-50`  |
| `primary-foreground`   | `gray-50`  | `gray-950` |
| `secondary`            | `gray-100` | `gray-800` |
| `secondary-foreground` | `gray-900` | `gray-50`  |
| `radius`               | `0.75rem`  | `0.75rem`  |

## 3 · Status — soft (tinted surface + saturated text), AA contrast

| Status        | Light surface / text  | Dark surface / text   |
| ------------- | --------------------- | --------------------- |
| `success`     | `#f0fdf4` / `#15803d` | `#0c2818` / `#4ade80` |
| `warning`     | `#fffbeb` / `#b45309` | `#2a1d05` / `#fbbf24` |
| `destructive` | `#fef2f2` / `#b91c1c` | `#2d1314` / `#f87171` |
| `info`        | `#eff6ff` / `#1d4ed8` | `#0e1d38` / `#60a5fa` |

---

## 4 · Mapping into Figma Variables

The Figma file (`jiDhe0OZzNgiDbc3Z9Hh5n`) uses seven collections, verified live via the Plugin API
as of `DSV2-004`:

| Collection           | Modes       | Contents                                                                                                  |
| -------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| **Color Primitives** | Value       | `gray-50…950`, `white`, and the `green/amber/red/blue` status primitives. Scopes hidden (`[]`).           |
| **Color**            | Light, Dark | All semantic surface/action/status/state roles, aliased to Color Primitives.                              |
| **Spacing**          | Value       | `spacing-base`, `space-0…16`.                                                                             |
| **Size**             | Value       | Control, icon, dialog, and minimum-target sizes.                                                          |
| **Radius**           | Value       | `radius-control`, `radius-surface`.                                                                       |
| **Typography**       | Value       | Font family/weight/size/line-height — see §5.                                                             |
| **Foundation**       | Value       | Non-color, non-typography scales with no closer-fitting collection (`opacity-disabled`, `layer-overlay`). |

- **Scopes** (never left as `ALL_SCOPES`): fills (`background / card / *-surface`) →
  `FRAME_FILL, SHAPE_FILL`; text (`foreground / *-foreground`) → `TEXT_FILL`; `border / input /
ring / invalid-*` → `STROKE_COLOR`; radius → `CORNER_RADIUS`; icon/dialog/target sizes →
  `WIDTH_HEIGHT`; `opacity-disabled` → `OPACITY`; `layer-overlay` → `[]` (no Figma node property
  represents stacking order, so nothing can bind to it — kept as a hidden, reference-only value for
  code-parity documentation, per `DSV2-004`'s verified finding).
- Every variable carries `codeSyntax.WEB` set to the exact `var(--token-name)` string from
  `packages/tokens/src/tokens.css` — this is what keeps the tables below traceable to code rather
  than restated by hand.

## 5 · Type & breakpoints

- Fonts: **Geist** (sans) + **Geist Mono**. In code via `@fontsource-variable/geist` (families
  `Geist Variable` / `Geist Mono Variable`). In Figma: 9 text styles (`Label / XS` through
  `Code / SM`) on Geist / Geist Mono.
- Breakpoints = Tailwind 4 defaults: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- **Typography is fully variable-bound as of `DSV2-004`.** All 9 text styles have `fontSize` and
  `lineHeight` bound to the `Typography` collection's `size/*` and `line-height/*` FLOAT variables
  (verified via a fresh `getLocalTextStylesAsync()` read showing every style's `boundVariables`
  populated, in a separate `use_figma` call from the one that set them — not just the immediate
  write-call return value). One verification nuance found during this work: the official
  `get_variable_defs` design-context tool does **not** surface variables bound at the text-style
  level (only variables bound directly on a node's own properties) — it returned `{}` for a node
  using a fully-bound style. Treat `get_variable_defs` as authoritative only for direct node
  bindings; for style-level bindings, read `TextStyle.boundVariables` via the Plugin API instead.

## 6 · DSV2-001/002 interaction and foundation additions (code-integrated, Figma parity complete)

`DSV2-001` added semantic state roles and cross-product foundation scales to
`packages/tokens/src/tokens.css`; `DSV2-002` wired the first real consumers. All values below are
**verified live in Figma** as of `DSV2-004` (collection/scope/value re-read fresh after mutation,
not assumed from the write call).

| Token                | Light              | Dark               | Figma location               | Consumer(s)                                       |
| -------------------- | ------------------ | ------------------ | ---------------------------- | ------------------------------------------------- |
| `--primary-hover`    | `gray-800`         | `gray-200`         | `Color / primary-hover`      | Button (solid variant, hover)                     |
| `--primary-pressed`  | `gray-700`         | `gray-300`         | `Color / primary-pressed`    | Button (solid variant, active/pressed)            |
| `--invalid-border`   | `red-700`          | `red-400`          | `Color / invalid-border`     | Input (`aria-invalid` border)                     |
| `--invalid-ring`     | `red-700`          | `red-400`          | `Color / invalid-ring`       | Input (`aria-invalid` focus ring)                 |
| `--opacity-disabled` | `0.5`              | `0.5`              | `Foundation / disabled`      | Button, Input, StatCard action (all disabled)     |
| `--layer-overlay`    | `50`               | `50`               | `Foundation / layer/overlay` | Modal (stacking context) — reference-only, see §4 |
| `--size-icon-sm`     | `1rem` (16px)      | `1rem` (16px)      | `Size / icon/sm`             | Modal close icon, Modal loading spinner           |
| `--size-icon-md`     | `1.25rem` (20px)   | `1.25rem` (20px)   | `Size / icon/md`             | StatCard overflow-action icon                     |
| `--size-target-min`  | `2.75rem` (44px)   | `2.75rem` (44px)   | `Size / target/min`          | StatCard overflow-action hit area (`DSV2-002`)    |
| `--size-dialog-sm`   | `26.25rem` (420px) | `26.25rem` (420px) | `Size / dialog/sm`           | Modal surface max width                           |

These 10 variables exist in Figma but are **not yet applied to the component sets themselves** —
`DSV2-004`'s scope is limited to the token/variable layer and explicitly excludes changing component
sets (that remains `DSV1-006`'s staged-replacement flow, reused for any future component-set
update). A component-set update to consume these variables is a separate, not-yet-scoped decision.

A `selected` state role was scoped as a candidate in `DSV2-001` but was deliberately not added — no
component has a current selected-state need. See
[`DESIGN_SYSTEM_CHARTER.md`](./DESIGN_SYSTEM_CHARTER.md#5--state-model) for the full state-model
rationale.
