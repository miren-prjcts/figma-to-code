# DSV1-002 — Badge and StatCard Contracts

## Objective

Stabilize Badge and StatCard as narrow, accessible metric and status primitives. Figma construction is explicitly out of scope for this ticket.

## Scope

### Badge

- Preserve `info | success | warning | destructive` semantic tones.
- Verify sufficient contrast in Light and Dark semantic modes.
- Keep the component non-interactive, with no hover, focus, or pressed variants.
- Confirm that a single size is intentional; record icon and dismissible behavior as exclusions unless a demonstrated product need changes scope.

### StatCard

- Keep title and value as instance content and retain its compact-metric role.
- Replace any permanently rendered inert overflow affordance with an explicit accessible action API, including an action-hidden state and interaction behavior.
- Resolve loading ownership: either state that Skeleton owns it or add a minimal tested state with no duplicate loading system.

## Deliberate exclusions

- Charts, trends, dashboard layouts, arbitrary action menus, icon/dismissible Badge variants, and Figma changes.

## Acceptance criteria

- Typed API and Storybook coverage document tone, action visibility, and meaningful content states.
- Tests cover action semantics and relevant accessibility behavior.
- Component styles consume semantic tokens only; no primitive values or raw colors.
- Typecheck, relevant tests, formatting, and production build are run and reported.
- The worktree contains only scoped code, test, story, and documentation changes; no commit, push, or Figma mutation unless specifically authorized in the execution approval.

## Handoff

Report the final prop/state matrix, contrast findings, loading decision, tests run, and any unresolved token gap.
