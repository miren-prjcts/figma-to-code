# Backlog

Status meanings: **Proposed** = discussed only; **Planned** = ticket written, execution not approved; **Active** = explicitly approved and in progress; **Review** = awaiting supervisor validation; **Done** = verified and integrated.

## Planned

| Priority | Workstream                                                                                          | Status   | Dependency                                                                   |
| -------- | --------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| 1        | Complete DS v1 component contracts: Button, Input, Badge, StatCard, Modal                           | Active   | Code contracts integrated; Figma component-set repair decision required      |
| 2        | DS v1.1 form and selection controls                                                                 | Planned  | Completed DS v1 component contracts                                          |
| 3        | DS v1.2 feedback and overlay components                                                             | Planned  | Completed DS v1 component contracts                                          |
| 4        | DS v1.3 navigation, data states, and utilities                                                      | Planned  | Completed DS v1 component contracts                                          |
| 5        | DS composition patterns and application templates                                                   | Planned  | Relevant component families complete                                         |
| 6        | DS quality gates, documentation, and release workflow                                               | Planned  | Stable component APIs                                                        |
| 7        | Repair DS v1 Figma component-set parity through a staged replacement                                | Planned  | User execution approval for DSV1-006                                         |
| 8        | Align pnpm runtime and build-script configuration                                                   | Planned  | User execution approval for DSV1-007; registry access for final verification |
| 9        | DS v2 reusable-starter foundations: semantic states, quality, governance                            | Planned  | DSV1-006 complete; execution approval: [DSV2-001–005](tickets/README.md)     |
| 10       | DS v2.1 universal form core: FormField, Textarea, Select, Checkbox, Radio, Switch, IconButton       | Proposed | DSV2 foundations integrated; product-agnostic API discovery                  |
| 11       | DS v2.2 feedback and overlays: Skeleton, Alert, Toast, Tooltip, Popover                             | Proposed | DSV2 foundations integrated; interaction-state contract stable               |
| 12       | DS v2.3 navigation and structural components: Breadcrumbs, Side Navigation                          | Proposed | Universal core complete; navigation-pattern discovery                        |
| 13       | DS v2.4 advanced data and command components: Data Table, Tree View, Calendar, Command Menu, Charts | Proposed | Validated use cases and separate discovery for each component family         |
| 14       | DS composition patterns and application templates                                                   | Proposed | Relevant component families complete                                         |

## Completed

| Workstream     | Outcome                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| DS foundations | Code-linked Figma token collections, Geist typography, Light/Dark aliases, effect styles, and foundation documentation pages |

## Deferred until product-driven discovery

- Data Table, Tree View, Calendar/Date Picker, Charts, Command Menu, Side Navigation, Breadcrumbs, rich text, file upload, and advanced combobox/multiselect remain outside the current execution batch.
- The first seven named families are committed roadmap scope for this reusable starter, after foundations and universal core work. Each still requires a focused discovery, plan, and execution approval cycle to avoid premature APIs.
