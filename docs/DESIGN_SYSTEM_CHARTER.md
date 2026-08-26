# Design System Charter

What this repository's design system is for, what it deliberately is not for, how its tokens and
components are architected, and the standards a contribution must meet. This charter is the entry
point for "does my proposed component/token belong here, and what do I need to prove?" For process
mechanics (golden workflow, approval gates, repository scope), see
[`PROJECT_OPERATIONS.md`](./PROJECT_OPERATIONS.md) — this charter does not repeat it.

Every claim below is labeled **Verified** (true in the current codebase as read at the time of
writing), **Roadmap** (approved future direction, not yet built), or **Deliberate exclusion** (in
scope for consideration, out of scope by decision). Do not treat Roadmap items as available today.

## 1 · Intended reusable scope

This is a **private, product-agnostic starter design system** for `miren-prjcts/figma-to-code`. It
exists to give any future product built from this repository a small set of code-and-Figma-aligned
primitives — tokens, Button, Input, Badge, StatCard, Modal today — that do not need to be
reinvented or renamed per product. **Verified.**

It is not yet, and has no committed date to become, any of the following:

- A publicly published npm package or component library. **Deliberate exclusion** (see
  [§7](#7--deliberate-exclusions)).
- A general-purpose UI kit covering every possible interaction pattern. Component scope grows only
  by validated, product-driven discovery (§4).
- A multi-brand or multi-density system. One palette, one type scale, two themes (Light/Dark).
  **Verified**, see [§3](#3--architecture).

## 2 · Non-goals

- Product-specific components or behavior (e.g., a domain object card, a checkout flow) do not
  belong in this package. They belong in the consuming product.
- Visual variety for its own sake. A new variant needs a real, named consumer — not "might be
  useful."
- Chasing Figma-side conveniences (visual-only variants, Figma-only properties) that have no code
  equivalent. Figma always mirrors code; see [`FIGMA_PARITY_CHECKLIST.md`](./FIGMA_PARITY_CHECKLIST.md).
- Automated publishing, versioned releases, or a public documentation site. This is a private `0.x`
  starter; see [`COMPONENT_LIFECYCLE.md`](./COMPONENT_LIFECYCLE.md) §6 for what "release" means here
  instead.

## 3 · Architecture

### 3.1 Two-tier token model

Tokens live in `packages/tokens/src/tokens.css` as two explicit levels (the file's own header
comment states the rule; this section explains the reasoning and gives the current table).
**Verified** against the file as of this writing.

- **Level 1 — primitives.** The raw `--gray-50` … `--gray-950` neutral scale, plus the raw
  `--green-*` / `--amber-*` / `--red-*` / `--blue-*` status scales. Constants. They do not change
  between Light and Dark and carry no semantic meaning of their own.
- **Level 2 — semantics.** Named roles (`--background`, `--primary`, `--success-surface`,
  `--invalid-border`, …) that alias primitives. `:root` defines the Light values; `.dark` overrides
  only the semantic layer for Dark — primitives are never redefined per theme.

The reason for the split: a theme or palette change should require editing aliases in one place,
never hunting through components for a raw value. It also means Figma variable collections can
mirror the same two-collection shape (`Primitives`, single mode; `Semantic`, Light/Dark modes) — see
[`figma-tokens.md`](./figma-tokens.md) for the exact value tables kept in sync with the CSS file.

### 3.2 Semantic-only consumption rule

Components and pages consume **only** Level 2 semantic tokens (`bg-primary`,
`text-muted-foreground`, `border-invalid-border`) — never a raw `--gray-*` or status-primitive
value directly. This is already enforced by convention (every current component contract was
verified against it) and stated tersely in the token file's header comment; the reason it matters
enough to restate here: a raw value bypasses theming (it will not flip in `.dark`), bypasses the
Figma variable binding (it becomes a detached/hardcoded value in the design file), and defeats the
one-place-change guarantee in §3.1. Reviewing a component's className output for a bare `gray-`,
hex, or `rgb()` literal is a fast way to catch a violation. **Verified** as current practice.

### 3.3 Token naming conventions

- **Primitives**: `--{family}-{step}` (`--gray-500`, `--green-700`). Step numbers are a fixed
  Tailwind-style neutral/status scale, not a free choice per addition.
- **Semantic surfaces/text**: role nouns, not appearance (`--card`, `--card-foreground`,
  `--muted-foreground`) so the same name stays correct when its underlying color changes.
- **Semantic state roles**: `--{base}-{state}` (`--primary-hover`, `--primary-pressed`,
  `--invalid-border`, `--invalid-ring`). A state role is added only when it has a real consumer or
  an explicitly approved near-term one — see §5.
- **Foundation/interaction scales**: `--{category}-{name}` (`--size-icon-sm`, `--size-target-min`,
  `--layer-overlay`, `--opacity-disabled`, `--size-dialog-sm`). These are cross-product scales, not
  component-owned magic numbers, so a second component with the same physical need reuses the token
  instead of inventing its own.

New tokens follow whichever of these shapes fits; do not invent a fifth naming scheme.

### 3.4 Theme policy

Exactly two themes: **Light** (`:root` defaults) and **Dark** (`.dark` class override on an
ancestor element). **Verified.** There is no system-preference auto-switch logic, density mode, or
third theme in this repository; adding one is a **Roadmap** decision requiring its own ticket and
approval, not an assumed extension of "theme."

## 4 · Component-selection principles

Whether a proposed component belongs in this starter is a design decision, not a vote on
usefulness. Use these tests, drawn from what actually got Button/Input/Badge/StatCard/Modal into
the starter and what is explicitly held out in
[`BACKLOG.md`](./BACKLOG.md#deferred-until-product-driven-discovery):

A component **earns a place now** when all of these hold:

1. **Cross-product necessity** — near every product built on this starter needs it, not just the
   first one.
2. **A single correct API exists** — its props/variants can be fully specified today without
   guessing a specific product's behavior (a Button's `variant`/`size`/`loading` is universal; a
   Data Table's pagination, sorting, and selection model is not).
3. **No net-new token category required**, or the new roles are scoped and approved in their own
   ticket the way `DSV2-001` scoped hover/pressed/disabled/invalid before any component consumed
   them. A component should not silently expand the token contract as a side effect.
4. **Accessibility is fully specifiable statically** — keyboard model, roles, and focus behavior
   are known and testable without product-specific customization.
5. **It survives on semantic tokens alone** — no component-local raw value, per §3.2.

A component is **deferred until product-driven discovery** when it fails any of the above — most
often #2: Data Table, Tree View, Calendar/Date Picker, Charts, Command Menu, Side Navigation,
Breadcrumbs, rich text, file upload, and advanced combobox/multiselect are named as deferred in
`BACKLOG.md` for exactly this reason. **Verified** against the current backlog table.

### Evidence required to propose a component

1. Name it in `BACKLOG.md` (Proposed or Planned status, with its real dependency).
2. Write a contract ticket (see [`COMPONENT_LIFECYCLE.md`](./COMPONENT_LIFECYCLE.md) §1) that
   specifies props, variants, states, and any new token roles it needs — a component ticket that
   introduces tokens states them explicitly, it does not leave them implicit in code.
3. Get explicit user approval per the Golden workflow in `PROJECT_OPERATIONS.md` before any
   implementation begins. Writing the ticket is not the approval.

## 5 · State model

DSV2-001 introduced dedicated semantic roles for interactive states, replacing prior ad hoc opacity
or foreground-as-border reuse. Current roles, **Verified** against `packages/tokens/src/tokens.css`:

| State        | Token(s)                                   | Consumer(s)                                                |
| ------------ | ------------------------------------------ | ---------------------------------------------------------- |
| Hover        | `--primary-hover`                          | Button (solid variant)                                     |
| Pressed      | `--primary-pressed`                        | Button (solid variant)                                     |
| Focus        | `--ring` (existing semantic role, not new) | Button, Input, StatCard action — `focus-visible` ring      |
| Disabled     | `--opacity-disabled`                       | Button, Input                                              |
| Invalid      | `--invalid-border`, `--invalid-ring`       | Input (`aria-invalid` styling)                             |
| **Selected** | _none_ — **deliberately deferred**         | _No current consumer._ Not added speculatively; see below. |

`Selected` was scoped as a candidate role in `DSV2-001` but no token or component consumes it today.
Per §4's rule 3, it stays out of the token contract until a component has an actual selected-state
need — adding it now would be exactly the "expand the contract with no consumer" pattern this
charter warns against.

`--size-target-min` (2.75rem / 44px minimum interactive target) is defined in the token contract and
is now consumed by StatCard's overflow action (`DSV2-002`, integrated): the button's hit area is
44×44px, inset so the icon's rendered position is unchanged. **Verified** by direct inspection of
`packages/ui/src/components/card.tsx`.

## 6 · Accessibility baseline

| Requirement                                                                      | Status                                                                                                                                             |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Minimum interactive target ≥ 44px (`--size-target-min`)                          | **Verified** — StatCard's overflow action, per §5.                                                                                                 |
| Focus-visible ring on all interactive elements                                   | **Verified** — Button, Input, and StatCard's action all render `focus-visible:ring-2 ring-ring` with an offset matched to their own surface color. |
| `prefers-reduced-motion` respected                                               | **Verified** — Button's loading spinner is `animate-spin motion-reduce:animate-none`, matching Modal's existing pattern (`DSV2-002`, integrated).  |
| Invalid state uses a dedicated stroke role, not a text role reused as a border   | **Verified** — Input's `aria-invalid` styling consumes `--invalid-border` / `--invalid-ring`, not `--destructive-foreground`.                      |
| Semantic-token-only color usage (theming, contrast maintained across Light/Dark) | **Verified**, see §3.2.                                                                                                                            |

Treat this table, not memory of what a ticket intended, as the source of truth for what is actually
built. Update it only when a change has landed and been verified, not when a ticket is merely
approved.

## 7 · Deliberate exclusions

Explicitly out of scope for this charter's governance and for the design system in its current
phase — raising these as "gaps" is not useful without a new approved ticket:

- Public documentation site or hosted Storybook.
- Publishing this package to any registry, or any package version bump tied to design-system work.
- An automated release pipeline (see `COMPONENT_LIFECYCLE.md` §6 for the manual policy that applies
  instead).
- Any Figma file mutation outside the serialized process in `FIGMA_PARITY_CHECKLIST.md`.
- Source-code changes as a side effect of documentation work (this charter is itself evidence of
  that boundary being held — DSV2-003 was scoped as docs-only).

## 8 · Minimum documentation for a new component

Before a component is considered done — in code or in Figma — it needs, at minimum, the same
documentation shape already produced for Button/Input/Badge/StatCard/Modal (see `DSV1-004`'s and
`DSV1-006`'s scopes for the precedent this generalizes from):

1. **Code-API reference** — exact prop names, types, and defaults; no Figma-only or code-only
   property may exist unpaired.
2. **Usage notes** — when to use it, and, if relevant, when not to (link to the deferred-component
   list in §4 if a nearby need is intentionally out of scope).
3. **Accessibility notes** — keyboard model, ARIA roles/attributes, and focus behavior, including
   any state that can only be demonstrated statically in Figma (label it as such).
4. **Deliberate-exclusion notes** — what the component intentionally does not do (variant it
   doesn't have, behavior it doesn't support), so a future contributor doesn't assume a silent gap.
5. **Storybook coverage** — stories for every public variant and meaningful state (loading,
   disabled, invalid, both themes where applicable).
6. **Figma parity** — a component set (or documented instance-content mapping) using only bound
   local variables/styles, with the same accessibility and exclusion notes placed nearby in the
   file, per the existing `Components` page convention. See
   [`FIGMA_PARITY_CHECKLIST.md`](./FIGMA_PARITY_CHECKLIST.md) for how that work is sequenced and
   gated.

## See also

- [`PROJECT_OPERATIONS.md`](./PROJECT_OPERATIONS.md) — golden workflow, approval gates, current
  repository state.
- [`COMPONENT_LIFECYCLE.md`](./COMPONENT_LIFECYCLE.md) — proposal through deprecation, grounded in
  what DS v1 and DS v2 actually did.
- [`FIGMA_PARITY_CHECKLIST.md`](./FIGMA_PARITY_CHECKLIST.md) — the code-first, serialized Figma
  handoff checklist.
- [`figma-tokens.md`](./figma-tokens.md) — the exact primitive/semantic value tables mirrored into
  Figma Variables.
- [`BACKLOG.md`](./BACKLOG.md) — current roadmap status and the deferred-component precedent cited
  in §4.
