# Component Lifecycle

The stages a component (or a token/foundation change) actually goes through in this repository,
from idea to release note. This describes the process **DS v1** (`DSV1-001` … `DSV1-007`) and
**DS v2** (`DSV2-001` … `DSV2-006`) already used — see [`docs/tickets/README.md`](./tickets/README.md)
for the tickets themselves — not an aspirational process this repository has not yet run. For who
approves what and when, see [`PROJECT_OPERATIONS.md`](./PROJECT_OPERATIONS.md)'s Golden workflow;
this document assumes that gate exists and describes what happens inside each stage of it.

## 1 · Proposal

A component or foundation change is named in [`BACKLOG.md`](./BACKLOG.md) with a status
(`Proposed` → `Planned` → `Active` → `Review` → `Done`) and a real dependency, not a placeholder
one. Naming it here is planning, not authorization — DS v2's own tickets state this explicitly
("not execution authorization... work starts only after the user approves").

Before a component clears this stage it must pass the selection test in
[`DESIGN_SYSTEM_CHARTER.md`](./DESIGN_SYSTEM_CHARTER.md#4--component-selection-principles): a real
cross-product need, a specifiable API, no silent token expansion, specifiable accessibility, and
semantic-token-only feasibility.

## 2 · Contract

A written ticket (`docs/tickets/DSVn-NNN-*.md`) defines: exact scope, deliberate exclusions,
acceptance criteria, and a handoff shape. This repository's tickets consistently separate
"what this changes" from "what it explicitly does not" (see any `DSV1-*`/`DSV2-*` ticket's
Scope/Deliberate exclusions split) — carry that split forward for new components. If the component
needs a new token role, the contract states the role, its Light/Dark values, and its consumer up
front — `DSV2-001` is the precedent: it scoped hover/pressed/disabled/invalid roles by name before
any component consumed them.

Execution does not begin until the user approves the ticket batch and its proposed model
assignment, per the Golden workflow.

## 3 · Implementation

Code contract lands first, in an isolated worktree per ticket where tickets run in parallel (DS
v1's `DSV1-001`/`002`/`003` ran concurrently in separate worktrees; DS v2 followed the same
pattern). Implementation is semantic-token-only (`DESIGN_SYSTEM_CHARTER.md` §3.2) — no raw color or
primitive-token consumption, no Figma-only property invented to fill a gap.

The primary agent reviews and integrates each verified code contract before the next stage begins.
Integration is a real gate, not a formality: `DSV2-005`'s own scope is "review all diffs for scope,
semantic-token discipline, API compatibility, accessibility, documentation quality... integrate
only reviewed work."

## 4 · Storybook

Stories cover every public variant and meaningful state — including loading, disabled, invalid, and
both themes where the component is theme-sensitive. This is a standing verification requirement
(`PROJECT_OPERATIONS.md`'s verification standard lists it explicitly), not optional polish, and it
is required before Figma parity work starts, since Figma parity documents states that must already
be demonstrable in code.

## 5 · Figma parity

Serialized, code-first, and gated on integration — see
[`FIGMA_PARITY_CHECKLIST.md`](./FIGMA_PARITY_CHECKLIST.md) for the full checklist. In outline: the
primary agent (only) builds or updates the Figma component set from the now-integrated code API,
using only existing bound local variables/styles, after code review — never in parallel with other
Figma mutations, and never as a way to explore a design the code hasn't committed to yet. This is
exactly the sequencing DS v1 and DS v2 used: `DSV1-004` ran only after `DSV1-001`–`003` were
integrated; `DSV2-004` is explicitly scoped to run only after `DSV1-006`, `DSV2-001`, `DSV2-002`,
and `DSV2-003` are "integrated and reviewed."

## 6 · Review

A dedicated supervisor-review ticket (`DSV1-005`, `DSV2-005`) closes out a batch: it verifies the
proportionate check suite actually ran (typecheck, relevant unit/a11y tests, formatting, production
build), confirms no unreviewed work was integrated, updates `BACKLOG.md`/`DECISIONS.md`/`ISSUES.md`
with verified outcomes (not intentions), and names the next approval point. A component is not
"done" until this stage records it as done with evidence — a passing ticket handoff report is not
itself the record.

## 7 · Versioning

This is a private, unpublished `0.x` starter (`DESIGN_SYSTEM_CHARTER.md` §1/§7). There is no semver
contract with external consumers and no package-version bump tied to design-system work — none of
the DS v1 or DS v2 tickets changed a package version, and none is expected to until the repository
itself is published, which is a separate, not-yet-approved decision. "Versioning" in this repository
today means: the git history and `DECISIONS.md`/`BACKLOG.md` are the record of what shape a
component's API was at a given commit. A breaking change to a public prop is called out in its
ticket's scope and in `DECISIONS.md`, the way `DSV1-003`'s controlled-dialog contract was recorded
in `DECISIONS.md` under "DS v1 dialog contract."

## 8 · Deprecation

No component in this repository has been deprecated yet; the closest precedent is the archival
pattern from `DSV1-006`: when the five original Figma component sets became structurally invalid,
they were not deleted — they were renamed with an `ARCHIVED (date)` prefix and moved to a dedicated
archive page, preserving their node IDs and documentation, with removal only ever happening after
an explicit user visual-checkpoint approval. Apply the same shape to a future component
deprecation:

1. Do not delete on first suspicion of obsolescence. Archive/mark deprecated in place.
2. Record the reason and the replacement (if any) in `DECISIONS.md` and `ISSUES.md`.
3. Removal (of code or of a Figma set) requires the same explicit user approval a mutation of that
   kind would need under the Golden workflow — deprecation does not lower the approval bar.

## 9 · Release notes

There is no automated release pipeline and none is planned as part of this governance work
(`DESIGN_SYSTEM_CHARTER.md` §7). "Release notes" here means the existing manual record-keeping
this repository already does for every completed workstream:

- `BACKLOG.md`'s **Completed** table gets a row naming the workstream and its verified outcome.
- `DECISIONS.md` gets an entry for any durable API or architectural decision made along the way.
- `PROJECT_OPERATIONS.md`'s **Current state** section is updated to reflect the newly true facts.

That three-document update, done by the reviewing supervisor ticket (stage 6), is this starter's
release note — appropriate for a private `0.x` repository with no external consumers, and it should
not be replaced with a promise of changelog automation that does not exist.
