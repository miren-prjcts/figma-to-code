# Active Issues

## Figma component-set structural error

The existing local Button, Input, Badge, Stat Card, and Modal component sets on the `Components` page return `Component set has existing errors` when their property definitions are read through the Figma Plugin API. The sets predate the current DS v1 execution batch, so they must not be deleted or rebuilt blindly. Inspect and repair the sets in Figma, or explicitly approve a controlled replacement plan, before the code-to-Figma parity phase resumes.

## pnpm ignored build scripts

The Husky pre-commit hook triggers a pnpm install that fails under the managed environment because `esbuild` and `sharp` build scripts are ignored. A frozen script-free install also cannot complete here because supply-chain verification requires registry access that is unavailable. Direct code checks must use an already provisioned dependency tree until an environment-level dependency policy decision is made.
