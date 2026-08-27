# Active Issues

## Resolved: Modal / State specimens frame data loss (2026-08-27)

The `Modal / State specimens` frame (`89:59`) and all five of its specimens were found completely
absent from the document — not moved or renamed, `getNodeByIdAsync` returned `null` for the frame
and every child ID previously recorded, and a document-wide name search found nothing. No script run
in this session called `.remove()` on that subtree, so the exact cause is unconfirmed; the Plugin API
has no access to Figma's own file version history, so a definitive cause can only come from checking
that history directly in the Figma app. Per user instruction, rebuilt from the documented
specification rather than chasing the history further. The rebuild is fully live-instance-based (a
Modal instance per specimen, with nested `primaryAction`/`secondaryAction` Button instances overridden
via `setProperties`) — an improvement on the original, which still mixed in a couple of hand-built
approximation frames for the disabled-combo specimens. Verified: document-wide instance scan (118
instances, 0 broken) and a screenshot matching the original specimen-by-specimen content exactly.

## Resolved: DSV2-007-D Button loading structure defect (2026-08-26)

An independent post-completion audit (not the executing agent's own report)
visually re-checked DSV2-007-C's claimed-complete Button and Modal loading
states and found the spinner rendering directly on top of the label text.
Plugin API inspection confirmed the root cause: `loadingIndicator` was bound
to the `loading` boolean's visibility, but `label` had no complementary
binding to hide itself — Figma has no invert-binding for `visible`. Fixed by
converting `loading` from a boolean into a 5th Button `state` variant
(30 variants total, not 24). Also found and fixed a second, unrelated
pre-existing gap while repairing `leadingIcon`/`trailingIcon` (previously
literal arrow-glyph text, not real icons): the visibility binding for those
two properties only existed on the 6 `state=default` leaves, not the other 18. Same day, the user asked for a different visual treatment of the
`loading` state — a leading spinner plus visible "Loading…" text instead of
a hidden label with a centered spinner — which required a matching change to
`packages/ui/src/components/button.tsx` (content now hidden with `sr-only`
so the original accessible name is preserved for assistive tech, per the
user's explicit choice) and its test, in addition to the Figma rebuild. See
[`DSV2-007-D`](tickets/DSV2-007-D-loading-structure-correction.md) for full
evidence (before/after screenshots, metadata, document-wide instance scan,
and the `packages/ui` verification suite).

## Resolved: DSV2-007-C icon and component-state parity correction (2026-08-26)

Visual review rejected the prior DSV2-007 completion claim: Modal's unlabelled
3×3 matrix did not communicate real states, loading did not render its actual
icon treatment, action labels were reset to `Button`, and StatCard's action
states were not adequately represented with the code's real icon asset.
`docs/tickets/DSV2-007-correction-icon-state-parity.md` corrected icon
sourcing and Modal's Boolean-property structure; its Button/Modal
loading-state completion claim was itself later found incomplete and is
corrected by DSV2-007-D above.

The Figma Plugin API opacity-binding defect is confirmed on Button disabled
variants `69:11`, `69:16`, `69:21`, `69:26`, `69:31`, and `69:36`: binding the
stored `0.5` disabled token resolves to approximately `0.005`. Those six
variants and StatCard's disabled action use a literal `0.5` workaround with no
token or public code API change.

## Resolved: Figma component-set structural error

The original local Button, Input, Badge, Stat Card, and Modal component sets on
the `Components` page returned `Component set has existing errors` when their
property definitions were read through the plugin API. Per DSV1-006, they were
not repaired or rebuilt in place: five code-aligned sets were staged and
validated, then cut over to the canonical `Components` page (`6:8`) after user
visual-checkpoint approval. The legacy and temporary staging pages were later
deleted with explicit user approval after the replacements remained stable.

## Managed pnpm and registry access

Repository configuration pins pnpm `9.15.4` in `package.json`,
`engines.pnpm`, and CI. Use `corepack pnpm` in this environment: plain pnpm can
resolve to an injected fallback of another major version.

`corepack pnpm install --frozen-lockfile` completed on 2026-08-26 (535
packages). Direct package-script verification also passed on the integration
checkout: typecheck for UI/Storybook/web, 33/33 UI tests, lint for
UI/Storybook/web, and both production builds. `turbo --force` is not a valid
uncached verifier here because its child processes use the injected pnpm 11
fallback; use direct `corepack pnpm --filter <package> <script>` commands.

No `esbuild` or `sharp` build-script approval was added, and no migration to
pnpm 11 was made.
