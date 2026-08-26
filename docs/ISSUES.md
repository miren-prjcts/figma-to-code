# Active Issues

## In progress: DSV2-007 component-state parity — session paused mid-ticket (2026-08-26)

Work is **not finished**. Session paused (approaching usage limit) partway through `docs/tickets/DSV2-007-component-state-parity.md`. State as of pause, verified live via `use_figma` against file `jiDhe0OZzNgiDbc3Z9Hh5n`:

**Done and validated (screenshot-confirmed):**

- **Button** (`32:32`): fully converted — now 24 variants (`variant`×`size`×`state`), `state` = `default/hover/pressed/disabled`. Solid uses `--primary-hover`/`--primary-pressed`; outline/ghost use existing `muted`/`secondary`; disabled uses `--opacity-disabled`. Laid out in a clean grid. No public code API touched.
- **StatCard** (now a `COMPONENT_SET` at `70:24`, was single `COMPONENT` `50:2`): converted to `action` = `none/default/hover/disabled`. Pre-existing `title`/`value` TEXT component properties were preserved (they were legitimately bound, not orphaned). Two **orphaned** component properties (`action#70:2` boolean, `actionLabel#70:3` text — leftover from before the user manually deleted the old unstructured `actionIcon`/`actionLabel` layers) were removed via `deleteComponentProperty`. A real bug was found and fixed: appending a new child to StatCard's auto-layout root made it flow into the layout stack instead of sitting at the intended absolute top-right position — fixed by setting `layoutPositioning = "ABSOLUTE"` before positioning.

**Known Figma Plugin API bug found, only one instance fixed so far:** binding a `FLOAT`/`OPACITY`-scoped variable to a node's `opacity` property via `node.setBoundVariable("opacity", variable)` resolves to the wrong value — the `Foundation/disabled` variable's stored value is confirmed `0.5`, but after binding, `node.opacity` reads back as `0.005` (100× too small), reproducibly, even after unbind/rebind. Direct literal assignment (`node.opacity = 0.5`) works correctly. **Applied the literal-value workaround only to StatCard's `action=disabled` variant's `action` frame** (id `70:22`, no longer variable-bound — a documented, deliberate exception to "every value traces to a variable"). **Not yet checked**: whether this same bug affects any other opacity binding in the file (Button's disabled variants use this same `Foundation/disabled` variable via `setBoundVariable("opacity", opacityVar)` on their whole component node — **this needs to be re-verified**, it may have the same 0.005 bug and just wasn't caught because disabled buttons are supposed to look faint anyway).

**Not started:**

- **Modal** (`53:2`, still a single `COMPONENT`, zero variants): needs `primaryAction`/`secondaryAction` state representation. Modal already contains Button _instances_ (`primaryAction` id `53:15`, `secondaryAction` id `53:10`) — the plan was to swap their `mainComponent` to Button's new state variants (e.g. `variant=solid, size=sm, state=hover`) plus toggle the boolean `loading` property, rather than duplicating fill logic. Also needs a `showCloseButton` on/off representation.
- Update the `Button / Documentation` and `Stat Card / Documentation` frames' state-matrix text (`59:6`, `59:24`) to describe the new states — required by DSV2-007's acceptance criteria, not done.
- **Deviation from the ticket's own plan**: DSV2-007 said to stage on a temporary page first (`DSV1-006` precedent) before touching the canonical `Components` page. Time pressure led to building directly on `6:8` instead. This worked out (no instances broke, Button/StatCard both validated), but Modal — not yet touched — should probably get the same direct-build treatment for consistency rather than reintroducing a staging page now.
- Final combined screenshot of the whole `Components` page, and the DSV2-007 handoff report itself.
- No commit was made for the Figma-side work (Figma has its own persistence — nothing to commit in git). `docs/BACKLOG.md` still lists DSV2-007 as not started; it should move to `Active`/`Done` once this resumes and finishes.

**To resume:** re-read `docs/tickets/DSV2-007-component-state-parity.md`, re-verify the opacity-binding bug on Button's disabled variants (`figma.getNodeByIdAsync` on the 6 `state=disabled` Button IDs — `69:11,69:16,69:21,69:26,69:31,69:36` — check `.opacity` read-back, fix with literal `0.5` if it shows `~0.005`), then build Modal's states, update the two Documentation frames, take a final screenshot, and write the DSV2-005/DSV2-007 handoff report before moving to DSV2-006 (Playwright harness, not started).

## Resolved: Figma component-set structural error

The original local Button, Input, Badge, Stat Card, and Modal component sets on the `Components` page returned `Component set has existing errors` when their property definitions were read through the Figma Plugin API. Per DSV1-006, they were not repaired or rebuilt in place: five new code-aligned sets were staged on a dedicated page, validated (metadata, screenshots, Light/Dark bindings, live property-toggle tests), and — after explicit user visual-checkpoint approval on 2026-08-26 — moved to the canonical `Components` page. The five original sets were archived (renamed with an `ARCHIVED (2026-08-26)` prefix, moved with their documentation frames to page `Archive / DS v1 Legacy (pre-2026-08-26)`), not deleted; their original node IDs are unchanged by the page move.

**Update, 2026-08-26 (later same day):** the user explicitly approved purging the archive, after confirming the replacement sets had been stable through the DSV2 batch. The `Archive / DS v1 Legacy (pre-2026-08-26)` page (5 archived component sets + their documentation frames) and the leftover `Components / DS v1 Staging` page (dead post-cutover preview content from the same ticket) were both deleted. Only the canonical `Components` page (`6:8`) remains as the source of component-set truth.

## Managed pnpm and registry access

Repository configuration pins pnpm `9.15.4` in `package.json`, `engines.pnpm`,
and CI. The managed environment's plain `pnpm` executable can be an injected
fallback of a different major version; invoke the intended runtime as
`corepack pnpm` in this environment to guarantee `9.15.4`.

On 2026-08-26, an earlier session's `corepack pnpm install --frozen-lockfile`
could not download required packages because the registry hostname could not
be resolved (`GET https://registry.npmjs.org/...` returned `ENOTFOUND`), so no
complete dependency tree was available and the verification suite could not
run at that time.

A later session on the same date re-ran `corepack pnpm install --frozen-lockfile`
with pnpm `9.15.4` and the same lockfile: the install completed (535 packages,
no registry error), and the full verification suite passed — `typecheck`
(3/3 packages), `test` (32/32 tests across button/input/badge/card/modal),
`lint` (3/3 clean), and `build` (`@repo/storybook` and `@repo/web` both build
successfully). The registry-access failure above was therefore transient to
that specific run, not a standing block on this repository or environment. No
`esbuild` or `sharp` build-script approval was added; any such approval
remains a separate security decision, and no migration to pnpm 11 was made.
