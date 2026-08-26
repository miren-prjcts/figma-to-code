# DSV2-001 — Semantic Token Contract and Theme Mapping

## Objective

Turn the current foundation tokens into a compact, documented contract for reusable product UI. Preserve the two-level primitive → semantic architecture and avoid introducing roles without a present component or approved near-term use.

## Scope

- Repair the Storybook elevation mapping so `shadow-soft` resolves to `effect-shadow-soft` in both themes.
- Define semantic roles for the states currently represented by ad hoc opacity or a foreground token used as a border: interactive hover, pressed, focus, disabled, selected, invalid border, and invalid ring.
- Add only the cross-product foundation scales required by the existing components and the approved universal core: minimum interactive target, icon sizes, elevation, layer order, motion duration, and motion easing.
- Replace existing component-local values with a token only where the role is stable and reusable. This includes the modal layer, width/elevation, and icon dimensions if the approved taxonomy covers them.
- Keep Light and Dark semantics complete and preserve the rule that components consume semantic values only.
- Keep the existing Tailwind mappings in the web and Storybook surfaces equivalent, with no self-referential custom properties.

## Deliberate exclusions

- New product-brand colors, additional theme modes, density modes, responsive layout components, or changes to public component APIs.
- Figma mutations, component construction, and visual redesign.
- Tokens for advanced components that have not passed their future discovery cycle.

## Acceptance criteria

- The token taxonomy documents each new role, consumer, and Light/Dark value.
- No cyclic custom-property reference remains in either Tailwind theme mapping.
- Existing UI components use no raw colour or primitive token directly.
- Every newly introduced state role has at least one documented consumer or explicit approved near-term consumer.
- Token stories demonstrate the added foundations in Light and Dark, including elevation where applicable.
- Typecheck, lint, formatting, relevant unit/a11y tests, and production builds are run; a managed-environment blocker is recorded verbatim rather than treated as a pass.

## Handoff

Report the token matrix, every migrated consumer, deliberate non-additions, verification evidence, and any Figma-parity implication for the serialized follow-up ticket.
