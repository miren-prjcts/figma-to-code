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
| [DSV1-006](DSV1-006-figma-controlled-replacement.md) | Staged Figma component-set replacement and parity validation | primary agent, `gpt-5.6-sol` | xhigh |
| [DSV1-007](DSV1-007-pnpm-runtime-alignment.md) | pnpm runtime/config alignment and verification recovery | `gpt-5.6-terra` | high |

## Shared verification baseline

- Typecheck, relevant unit and accessibility tests, formatting, and production build.
- Storybook stories for public variants and meaningful states.
- Semantic-token-only implementation, with no raw colors or primitive-token use in components.
- Figma property and static-state parity only after the code API is integrated and verified.
- Record any check blocked by the managed `pnpm` build-script policy with its command output and do not represent it as passing.

## DS v2 — Reusable Starter Foundations (awaiting execution approval)

This batch implements the user-approved direction for a product-agnostic reusable starter. It is a planning artifact only: no implementation, Figma mutation, commit, or push is authorized until the user approves this ticket batch and its model assignments.

## Sequencing

1. `DSV2-001` establishes the semantic contract.
2. `DSV2-002` consumes that contract to harden the existing components; `DSV2-003` may proceed in parallel after the contract is stable enough to document.
3. `DSV2-004` is serialized through the primary agent after reviewed code integration. It stops at the known Figma component-set API limitation.
4. `DSV2-005` reviews verified outcomes and records the next approval point.

| Ticket | Scope | Proposed owner | Proposed reasoning |
| --- | --- | --- | --- |
| [DSV2-001](DSV2-001-semantic-token-contract.md) | Semantic state tokens, compact foundation scales, and theme mapping | `gpt-5.6-sol` | xhigh |
| [DSV2-002](DSV2-002-interaction-accessibility-hardening.md) | Existing-component accessibility and state hardening | `gpt-5.6-terra` | high |
| [DSV2-003](DSV2-003-system-documentation-governance.md) | Charter, extension rules, Figma/code checklist, lifecycle | `gpt-5.6-terra` | high |
| [DSV2-004](DSV2-004-figma-foundation-parity.md) | Serialized Figma foundation parity | primary agent, `gpt-5.6-sol` | xhigh |
| [DSV2-005](DSV2-005-supervisor-review.md) | Integration, verification, and project records | primary agent, `gpt-5.6-sol` | high |
