# Active Issues

## GitHub push access

The local repository contains commit `8d8faf2`, but pushing to `https://github.com/miren-prjcts/figma-to-code.git` failed with HTTP 403. The current GitHub identity does not have write access. Resolve repository access or authenticate with an authorized account before retrying a push.

## pnpm ignored build scripts

The Husky pre-commit hook triggers a pnpm install that fails under the managed environment because `esbuild` and `sharp` build scripts are ignored. Direct project checks previously passed, but the hook needs an environment-level dependency policy decision before it can be relied upon.
