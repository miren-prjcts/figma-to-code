# DSV2-015 — Serialized Figma Parity: Phase 1 Form Core

## Dependency

`DSV2-011`, `DSV2-012`, and `DSV2-013` are integrated and reviewed. Figma work is serialized
through the primary agent, per `FIGMA_PARITY_CHECKLIST.md` and `COMPONENT_LIFECYCLE.md` §5.

## Objective

Build the Phase 1 form-core component sets in Figma from the integrated code APIs.

## Scope

- Create a new `Components / Forms` page, following the family-based page convention seeded by
  `Components / Core` (2026-08-27 decision).
- Component sets for Checkbox, Radio, Switch, Select, Textarea, IconButton, and Button's new `lg`
  size and `destructive` variant added to the existing Button set on `Components / Core`. FormField
  is documented as a composition pattern (label/description/error wiring) on the Forms page rather
  than built as a standalone visual set if it has no independent visual identity beyond its child
  control.
- A documentation frame per component, matching Charter §8's minimum shape (code-API reference,
  usage notes, accessibility notes, deliberate-exclusion notes) — the same shape already produced
  for Button/Input/Badge/StatCard/Modal.
- Verify every state/variant with live property toggles and a document-wide instance scan (zero
  broken), per the 2026-08-27 precedent.

## Deliberate exclusions

- Any component or property not present in the integrated Phase 1 code API.
- Phase 2/3 components (Alert, Toast, Tooltip, Popover, Skeleton, Spinner, Dropdown Menu, and the
  navigation/structural family).

## Acceptance criteria

- Every Figma variant/property is traceable to the integrated code API.
- A document-wide instance scan shows zero broken instances after the build.
- Documentation frames match Charter §8's six required elements for each new component.
- `FIGMA_PARITY_CHECKLIST.md` is followed and its evidence retained.

## Handoff

Report the parity matrix, verification evidence (metadata and screenshots), and the next approval
point (Phase 1 supervisor review).
