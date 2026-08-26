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

- **Collection «Primitives»** — single mode. Only `gray-50…950`.
- **Collection «Semantic»** — **two modes: Light + Dark**. Neutrals are **aliases** to `Primitives/gray-*` (semantic references primitives). Status surface/text are direct hex per mode (table above).
- **Scopes** (don't leave `ALL_SCOPES`): fills (`background / card / *-surface`) → `FRAME_FILL, SHAPE_FILL`; text (`foreground / *-foreground`) → `TEXT_FILL`; `border / input / ring` → `STROKE_COLOR`; `radius` → `CORNER_RADIUS`.
- Create real **Variables** (not color styles), with **two modes**.

## 5 · Type & breakpoints

- Fonts: **Geist** (sans) + **Geist Mono**. In code via `@fontsource-variable/geist` (families `Geist Variable` / `Geist Mono Variable`). In Figma: text styles on Geist.
- Breakpoints = Tailwind 4 defaults: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- Text styles currently bind only their color-fill to a Figma variable; `--font-size-*` /
  `--line-height-*` are not yet bound as Figma number Variables (confirmed via a live
  `get_variable_defs` check on a sampled text node). Binding them is `DSV2-004` scope, not yet
  executed — see [`FIGMA_PARITY_CHECKLIST.md`](./FIGMA_PARITY_CHECKLIST.md#known-current-gap-as-of-this-ticket).

## 6 · DSV2-001 interaction/foundation additions (code-integrated, Figma parity pending)

`DSV2-001` added semantic state roles and cross-product foundation scales to
`packages/tokens/src/tokens.css`. These are **integrated in code**; mapping them into Figma
Variables is `DSV2-004` scope and has not run yet as of this writing — do not assume the collections
below already exist in the Figma file without verifying through the Plugin API first.

| Token                | Light              | Dark               | Consumer(s)                                                                     |
| -------------------- | ------------------ | ------------------ | ------------------------------------------------------------------------------- |
| `--primary-hover`    | `gray-800`         | `gray-200`         | Button (solid variant, hover)                                                   |
| `--primary-pressed`  | `gray-700`         | `gray-300`         | Button (solid variant, active/pressed)                                          |
| `--invalid-border`   | `red-700`          | `red-400`          | Input (`aria-invalid` border)                                                   |
| `--invalid-ring`     | `red-700`          | `red-400`          | Input (`aria-invalid` focus ring)                                               |
| `--opacity-disabled` | `0.5`              | `0.5`              | Button, Input (disabled)                                                        |
| `--layer-overlay`    | `50`               | `50`               | Modal (stacking context)                                                        |
| `--size-icon-sm`     | `1rem`             | `1rem`             | Modal close icon, Modal loading spinner                                         |
| `--size-icon-md`     | `1.25rem`          | `1.25rem`          | StatCard overflow-action icon                                                   |
| `--size-target-min`  | `2.75rem`          | `2.75rem`          | Approved near-term: StatCard action (`DSV2-002`) — no component consumes it yet |
| `--size-dialog-sm`   | `26.25rem` (420px) | `26.25rem` (420px) | Modal surface max width                                                         |

A `selected` state role was scoped as a candidate in `DSV2-001` but was deliberately not added —
no component has a current selected-state need. See
[`DESIGN_SYSTEM_CHARTER.md`](./DESIGN_SYSTEM_CHARTER.md#5--state-model) for the full state-model
rationale.
