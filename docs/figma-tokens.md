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
