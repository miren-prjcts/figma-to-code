# DSV1-001 — Button and Input Contracts

## Objective

Bring Button and Input to stable, accessible code contracts. Figma construction is explicitly out of scope for this ticket.

## Scope

### Button

- Preserve `variant: solid | outline | ghost` and `size: sm | md` unless a documented compatibility reason requires a change.
- Implement and test default, hover, pressed, focus-visible, disabled, and loading behavior.
- Support text-only, leading-icon, and trailing-icon composition without creating an icon-only variant.
- Prevent duplicate activation while loading and retain an accessible name.

### Input

- Replace permanently search-styled behavior with a general text-input contract.
- Support optional leading and trailing adornments through explicit code props.
- Implement and test placeholder/default, filled, focus-visible, disabled, read-only, and invalid states, retaining native semantics and `aria-invalid`.
- Keep labels, helper text, and error-copy layout out of scope; FormField owns that future responsibility.

## Deliberate exclusions

- IconButton, search-specific affordances without explicit props, FormField, Select, Textarea, destructive Button variants, and Figma changes.

## Acceptance criteria

- Public TypeScript APIs and defaults are documented in Storybook.
- Interaction tests cover loading activation prevention and keyboard/focus behavior where applicable.
- Existing semantic tokens are used; any necessary new semantic token has an explicit written justification.
- Typecheck, relevant tests, formatting, and production build are run and reported.
- The worktree contains only scoped code, test, story, and documentation changes; no commit, push, or Figma mutation unless specifically authorized in the execution approval.

## Handoff

Report the final prop/state matrix, tests run, token additions or gaps, deliberate exclusions, and exact files changed for supervisor integration.
