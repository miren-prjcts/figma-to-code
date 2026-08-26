# Backlog

Status meanings: **Proposed** = discussed only; **Planned** = ticket written, execution not approved; **Active** = explicitly approved and in progress; **Review** = awaiting supervisor validation; **Done** = verified and integrated.

Governance: before proposing or scoping a new component or token, see the
[Design System Charter](DESIGN_SYSTEM_CHARTER.md) (reusable scope, component-selection principles,
token/state/accessibility standards), the [Component Lifecycle](COMPONENT_LIFECYCLE.md) (proposal
through release notes), and the [Figma / Code Parity Checklist](FIGMA_PARITY_CHECKLIST.md) (code
review before serialized Figma work).

## Planned

| Priority | Workstream                                                                                          | Status   | Dependency                                                           |
| -------- | --------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------- |
| 1        | DS v1.1 form and selection controls                                                                 | Planned  | Completed DS v1 component contracts                                  |
| 2        | DS v1.2 feedback and overlay components                                                             | Planned  | Completed DS v1 component contracts                                  |
| 3        | DS v1.3 navigation, data states, and utilities                                                      | Planned  | Completed DS v1 component contracts                                  |
| 4        | DS composition patterns and application templates                                                   | Planned  | Relevant component families complete                                 |
| 5        | DS quality gates, documentation, and release workflow                                               | Planned  | Stable component APIs                                                |
| 6        | DS v2 reusable-starter foundations: semantic states, quality, governance                            | Planned  | Execution approval: [DSV2-001–005](tickets/README.md)                |
| 7        | DSV2-006 self-hosted Playwright visual-regression harness for Storybook                             | Planned  | DSV2-002 and DSV2-005 integrated                                     |
| 8        | DS v2.1 universal form core: FormField, Textarea, Select, Checkbox, Radio, Switch, IconButton       | Proposed | DSV2 foundations integrated; product-agnostic API discovery          |
| 9        | DS v2.2 feedback and overlays: Skeleton, Alert, Toast, Tooltip, Popover                             | Proposed | DSV2 foundations integrated; interaction-state contract stable       |
| 10       | DS v2.3 navigation and structural components: Breadcrumbs, Side Navigation                          | Proposed | Universal core complete; navigation-pattern discovery                |
| 11       | DS v2.4 advanced data and command components: Data Table, Tree View, Calendar, Command Menu, Charts | Proposed | Validated use cases and separate discovery for each component family |
| 12       | DS composition patterns and application templates                                                   | Proposed | Relevant component families complete                                 |

## Completed

| Workstream                                                                     | Outcome                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| DS foundations                                                                 | Code-linked Figma token collections, Geist typography, Light/Dark aliases, effect styles, and foundation documentation pages                                                                                                                                                                     |
| DS v1 component contracts: Button, Input, Badge, StatCard, Modal               | Code integrated (`903344a`, `67429f0`, `6a85142`); Figma parity achieved via DSV1-006 (below)                                                                                                                                                                                                    |
| DSV1-006: Repair DS v1 Figma component-set parity through a staged replacement | Five components staged, validated (metadata, screenshots, Light/Dark, live property toggles), and cut over to the canonical `Components` page (`6:8`) on 2026-08-26 after user visual-checkpoint approval. Legacy sets archived (not deleted) on page `Archive / DS v1 Legacy (pre-2026-08-26)`. |
| DSV1-007: Align pnpm runtime and build-script configuration                    | pnpm `9.15.4` enforced via `engines.pnpm`; invalid pnpm-11 `allowBuilds` placeholder removed; full install + verification suite (typecheck, 32/32 tests, lint, build) passed on 2026-08-26                                                                                                       |

## Deferred until product-driven discovery

- Data Table, Tree View, Calendar/Date Picker, Charts, Command Menu, Side Navigation, Breadcrumbs, rich text, file upload, and advanced combobox/multiselect remain outside the current execution batch.
- The first seven named families are committed roadmap scope for this reusable starter, after foundations and universal core work. Each still requires a focused discovery, plan, and execution approval cycle to avoid premature APIs.
- This is the working precedent for the component-selection test in
  [Design System Charter §4](DESIGN_SYSTEM_CHARTER.md#4--component-selection-principles): each of
  these families fails the "a single correct API exists" test today.
