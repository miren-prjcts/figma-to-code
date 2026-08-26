# DS v1 Component Contracts — Execution Batch

These tickets implement the approved DS v1 plan. They are **not** execution authorization. Work starts only after the user approves this batch and its model assignments.

## Sequencing

1. `DSV1-001`, `DSV1-002`, and `DSV1-003` may run in separate worktrees concurrently.
2. The primary agent reviews and integrates the verified code contracts.
3. `DSV1-004` performs serialized Figma work from the integrated code APIs.
4. `DSV1-005` performs the final supervisor review, records verified outcomes, and creates the local integration commit if it is within the approved execution scope.

No ticket may introduce a Figma-only property, raw color value, primitive color consumption, or a component outside its defined scope.

| Ticket                                    | Scope                                                     | Proposed owner               | Proposed reasoning |
| ----------------------------------------- | --------------------------------------------------------- | ---------------------------- | ------------------ |
| [DSV1-001](DSV1-001-button-input.md)      | Button and Input code contracts                           | `gpt-5.6-sol`                | high               |
| [DSV1-002](DSV1-002-badge-stat-card.md)   | Badge and StatCard code contracts                         | `gpt-5.6-terra`              | high               |
| [DSV1-003](DSV1-003-modal.md)             | Modal dialog contract                                     | `gpt-5.6-sol`                | xhigh              |
| [DSV1-004](DSV1-004-figma-parity.md)      | Serialized Figma component construction and documentation | primary agent, `gpt-5.6-sol` | xhigh              |
| [DSV1-005](DSV1-005-supervisor-review.md) | Integration, verification, records, and local commit      | primary agent, `gpt-5.6-sol` | high               |

## Shared verification baseline

- Typecheck, relevant unit and accessibility tests, formatting, and production build.
- Storybook stories for public variants and meaningful states.
- Semantic-token-only implementation, with no raw colors or primitive-token use in components.
- Figma property and static-state parity only after the code API is integrated and verified.
- Record any check blocked by the managed `pnpm` build-script policy with its command output and do not represent it as passing.
