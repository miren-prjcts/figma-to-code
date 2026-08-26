# DSV2-002 — Interaction and Accessibility Hardening

## Dependency

`DSV2-001` is integrated. This ticket consumes its finalized semantic state and size tokens.

## Objective

Bring the existing public components to the reusable-starter accessibility baseline without widening their APIs or introducing product-specific behavior.

## Scope

- Ensure all existing interactive targets meet the project minimum target-size token. In particular, replace the 20px unpadded StatCard overflow action with an accessible target while preserving its visual weight.
- Respect `prefers-reduced-motion` for the Button loading indicator and any other motion touched by this ticket.
- Apply the semantic invalid border/ring roles from `DSV2-001` to Input rather than treating text-foreground as a stroke role.
- Migrate Modal’s reusable layer, elevation, and width roles to the finalized token contract where applicable.
- Add focused UI tests for target geometry/state hooks, reduced-motion behavior, and semantic state consumption; retain current keyboard and focus-management coverage.
- Update Storybook stories to make the verified states inspectable.

## Deliberate exclusions

- New components, responsive layout patterns, FormField, validation messages, destructive action variants, and modal API expansion.
- Replacing the dialog implementation or changing its controlled dismissal policy.
- Figma changes.

## Acceptance criteria

- StatCard’s optional action has a documented minimum pointer target and an accessible name.
- Loading affordances have a non-animated reduced-motion alternative.
- Input invalid styling consumes dedicated semantic roles.
- Public component APIs remain backward compatible.
- New or changed behavior is covered by semantic Testing Library assertions and Storybook states.
- Typecheck, lint, formatting, relevant tests, and builds are reported with exact evidence or an exact environment blocker.

## Handoff

Report the changed state matrix, accessibility decisions, API compatibility result, verification output, and any remaining platform-specific accessibility risk.
