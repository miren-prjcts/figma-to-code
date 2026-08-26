# DSV1-003 — Modal Dialog Contract

## Objective

Refactor Modal into an accessible, controlled dialog with an explicit dismissal and focus-management policy. Figma construction is explicitly out of scope for this ticket.

## Scope

- Define a controlled `open` / close-request API with a clear backdrop-close policy.
- Implement Escape handling, focus trapping, return focus, scroll locking, and semantic title/description relationships.
- Support optional description, close-button visibility, and one- or two-action footer composition.
- Define and test default, disabled, and loading action states.
- A proven dialog primitive is permitted only if its public API remains small and visual ownership remains with the project token system.

## Deliberate exclusions

- Destructive confirmation variants without approved semantic action tokens, arbitrary layout slots, popover/menu behavior, toast behavior, and Figma changes.

## Acceptance criteria

- Automated tests cover keyboard dismissal, focus containment, focus return, and the backdrop policy.
- Storybook documents structural variations and action states.
- Accessible name and description relationships are verified.
- Semantic tokens only; no raw colors or primitive-token styling.
- Typecheck, relevant tests, formatting, and production build are run and reported.
- The worktree contains only scoped code, test, story, and documentation changes; no commit, push, or Figma mutation unless specifically authorized in the execution approval.

## Handoff

Report the final API, dismissal/focus policy, dependency introduced if any, tests run, and any unresolved accessibility risk.
