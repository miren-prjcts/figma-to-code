# DSV1-006 — Controlled Figma Component-Set Replacement

## Objective

Replace the five structurally invalid Figma component sets with code-aligned local sets, preserving an audit trail and requiring user visual approval before any legacy-set removal.

## Preconditions

- Code contracts from `903344a`, `67429f0`, and `6a85142` are the source of truth.
- The existing component sets return `Component set has existing errors` when property definitions are read through the Figma Plugin API.
- This ticket is serialized and owned by the primary agent.

## Phase A — Preserve and inspect

Record exact IDs, metadata, and screenshots of existing Button, Input, Badge, Stat Card, and Modal sets. Persist the Figma state ledger outside the file. Do not delete, rename, detach, or otherwise mutate legacy sets.

## Phase B — Staged replacement

Create a dedicated staging page with deterministic naming. Build exactly five local sets using existing local Color, Spacing, Size, Radius, Typography variables, Geist styles, and effect styles. Use only code-backed properties and static state references. Add concise code-API, accessibility, and deliberate-exclusion documentation.

### Contract map

- Button: `variant`, `size`, `leadingIcon`, `trailingIcon`, `loading`.
- Input: `leadingAdornment`, `trailingAdornment`, `disabled`, `readOnly`, `aria-invalid`; content is instance content.
- Badge: `tone` only.
- StatCard: title/value instance content and optional `action`; action label is instance content.
- Modal: visible dialog structure, optional description, `showCloseButton`, primary/secondary actions and their labels/states. Focus, Escape, scroll, and backdrop policy are documented behavioral notes.

## Phase C — Validation and checkpoint

Validate metadata, screenshots, bindings, Light/Dark behavior, and code-to-Figma parity. Stop for user visual review. Do not remove or alter legacy sets before explicit checkpoint approval.

## Phase D — Cutover (requires checkpoint approval)

Archive or remove only the exact legacy IDs recorded in Phase A, then move the approved staged sets to the canonical Components location. Confirm exactly five approved local DS v1 sets remain and update the state ledger and project records.

## Acceptance criteria

- No legacy component set is touched before the visual checkpoint.
- Every public Figma property maps to a final code API or documented instance-content mapping.
- All visual properties use existing local bindings; no hardcoded fills, strokes, spacing, radius, or typography values are introduced.
- Figma writes are strictly sequential and every created/mutated ID is persisted.
