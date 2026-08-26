# Active Issues

## Figma component-set structural error

The existing local Button, Input, Badge, Stat Card, and Modal component sets on the `Components` page return `Component set has existing errors` when their property definitions are read through the Figma Plugin API. The sets predate the current DS v1 execution batch, so they must not be deleted or rebuilt blindly. Inspect and repair the sets in Figma, or explicitly approve a controlled replacement plan, before the code-to-Figma parity phase resumes.

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
