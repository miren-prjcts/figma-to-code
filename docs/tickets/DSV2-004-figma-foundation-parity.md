# DSV2-004 — Serialized Figma Foundation Parity

## Dependency

`DSV1-006`, `DSV2-001`, `DSV2-002`, and `DSV2-003` are integrated and reviewed. Figma work is serialized through the primary agent.

## Objective

Verify and, only where safely supported, synchronize the approved foundation-token changes with the code-backed Figma library.

## Scope

- Compare the integrated code token contract with Figma variable collections, modes, scopes, and foundation documentation.
- Apply only approved variable/documentation changes that can be verified through the available Figma API.
- Verify Light/Dark semantic aliases and new state/foundation roles after each mutation.
- Record prop/state implications for the existing components without changing component sets in this ticket.
- Bind the typography scale (`--font-size-*` / `--line-height-*` pairs in `packages/tokens/src/tokens.css`) as Figma number Variables in the Semantic collection (single mode — values are identical across Light/Dark), replacing the current static-text-style-only representation confirmed via live API inspection (`get_variable_defs` on a body-text node returns only the color-fill binding, not size/line-height). Rebind the corresponding text styles to the new variables.
- Do not repair, recreate, replace, or work around component sets: that work belongs exclusively to the completed `DSV1-006` staged-replacement flow.

## Deliberate exclusions

- Any component-set repair, replacement, or Figma-only property/variant.
- Parallel Figma mutations, raw colour values that bypass code semantics, and unverified bulk updates.

## Acceptance criteria

- Every applied Figma value is traceable to an integrated code token and has a verified scope/mode.
- No Figma-only token, component property, or visual state is introduced.
- The report separates verified parity from access/API blockers.
- Before/after evidence is retained for each mutation.
- Every typography text style consumes bound size/line-height variables rather than static values; the binding is verified via `get_variable_defs`, not assumed from the Figma UI.

## Handoff

Report the exact parity matrix, Figma changes, validation evidence, unresolved API limitations, and whether any subsequent component-parity decision is required.
