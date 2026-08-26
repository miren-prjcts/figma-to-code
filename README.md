# ds-starter

Production-ready starter monorepo for a design system: **tokens → ui → storybook**, built with **shadcn/ui styling + Tailwind 4**. It is a foundation for a new product or a team template, not a finished product.

The repository includes a production-minded foundation: semantic tokens, reusable React components, Storybook, a Next.js surface, accessibility checks, and CI. Sample components and the demo page intentionally serve as a starting point: adapt them to your brand, content, domain scenarios, and requirements before using them in a specific product.

## Structure

```
packages/
  tokens/      @repo/tokens — semantic CSS variables (single source of truth)
  ui/          @repo/ui     — shadcn-style components (Badge, Button…) (cva + cn)
apps/
  storybook/   @repo/storybook — Storybook 8 + Tailwind 4 + a11y + theme toggle
  web/         @repo/web — Next.js 15 surface consuming the same tokens and UI package
```

Layers: **tokens** (values) → **ui** (components that consume tokens through classes such as `bg-success`) → **storybook** (the environment where everything is visible). The application (Storybook) builds the Tailwind theme; components remain clean.

## Quick start

```bash
corepack enable pnpm        # once: enables pnpm through Node
pnpm install
pnpm storybook              # → http://localhost:6006
pnpm --filter @repo/web dev # → http://localhost:3000
```

Other commands:

```bash
pnpm typecheck       # strict TypeScript across all packages
pnpm lint            # ESLint (+ jsx-a11y, react-hooks)
pnpm test            # component unit/UI tests
pnpm test:e2e        # Next.js Playwright smoke tests
pnpm format          # Prettier --write (+ Tailwind class sorting)
pnpm format:check    # Prettier --check (as in CI)
pnpm build-storybook # static build (as in CI)
pnpm build           # full web + Storybook build (as in CI)
```

## Propagation demo

Open `packages/tokens/src/tokens.css`, change a semantic token (for example, `--warning-foreground` or `--radius`), then refresh Storybook. **All** instances update at once because they consume the token rather than a hardcoded value. One edit, everywhere.

> For moving these tokens into Figma Variables (Light/Dark), see `docs/figma-tokens.md`.

## Adding a component

Create a new file in `packages/ui/src/components/`, define variants with `cva`, use colors **only** from tokens (`bg-*`), export it from `src/index.ts`, and add a story in `apps/storybook/stories/`. The shadcn CLI is optional (`components.json` is ready), but components work without it.

### Modal contract

`Modal` is controlled: pass `open` and update it when `onCloseRequest` reports an Escape-key, close-button, or permitted backdrop request. Backdrop dismissal is disabled by default; opt in with `closeOnBackdropClick`. A primary action is required and a secondary action is optional. Each action supports `default`, `disabled`, and `loading` states. Action callbacks do not close the modal automatically, so async completion and validation remain under consumer control.

When open, the modal moves focus inside, traps keyboard focus, locks body scrolling, and returns focus to the previously focused element after the consumer closes it. Keep `title` meaningful; omit `description` rather than passing unrelated help text.

## Tests and pull request requirements

Every behavior change must be accompanied by tests. This applies to both new components and changes to existing ones.

- A new or modified UI component: a unit/UI test in `packages/ui/src/**/*.test.tsx`.
- A new component or variant: a Storybook story for visual verification and documentation.
- A change to accessibility or interactions: semantic queries in Testing Library and verification with the Storybook a11y add-on.
- A critical Next.js user journey: a Playwright smoke test in `tests/e2e/`.
- A pull request is ready only after every local and CI check passes.

To run E2E tests locally, install a Playwright browser once:

```bash
pnpm exec playwright install chromium
```

## Checks

- **TS strict** (per package) · **ESLint** (typescript + react-hooks + jsx-a11y) · **Prettier** (+ Tailwind class-sort) · **Vitest + Testing Library** · **Playwright smoke** · **Storybook a11y addon** (`a11y.test: error`).
- **Git hooks** (husky): `pre-commit` → lint-staged (`eslint --fix` + Prettier on staged files); `pre-push` → typecheck. They are installed automatically with `pnpm install` (`prepare`).
- **CI** (`.github/workflows/ci.yml`): install → format:check → typecheck → lint → component unit/UI tests → build web + Storybook → Playwright E2E.
- `dist`/`node_modules`/`storybook-static` are in `.gitignore` (build artifacts are not committed).

## Using this as a template

1. Copy the directory (or use “Use this template” if it is on GitHub).
2. Rename `name` in the root `package.json`.
3. `corepack enable pnpm && pnpm install`.
4. Replace the sample components with your own and add your tokens to `packages/tokens`.

## Stack

pnpm workspaces · turborepo · TypeScript (strict) · React 19 · Tailwind CSS 4 · shadcn-style components (cva + clsx + tailwind-merge) · Storybook 8 (react-vite) · ESLint 9 (flat).
