# Figma / Code Parity Checklist

**Code is the source of truth.** Every Figma variable, style, component property, and visible state
must trace back to an integrated code token or code API — never the reverse. This checklist
formalizes the sequencing that `DSV1-004`, `DSV1-006`, and `DSV2-004` already establish as practice
in this repository (see their Dependency/Scope sections) so it can be applied consistently to future
work without re-deriving it each time. It does not introduce new policy.

## Non-negotiable order

Figma work never starts before this order is satisfied, and it never runs in parallel with itself:

1. **Code contract reviewed and integrated.** The component or token change has passed through
   [`COMPONENT_LIFECYCLE.md`](./COMPONENT_LIFECYCLE.md) stages 1–4 (proposal, contract,
   implementation, Storybook) and been integrated by the primary agent — not merely opened as a PR
   or reported "done" by an execution agent.
2. **Figma work is serialized through the primary agent.** No parallel Figma mutation, ever — see
   the Lesson recorded in `LESSONS.md` ("Shared Figma mutation safety"). One agent, one file, one
   change at a time, validated between phases.
3. **Only then** does Figma variable/style/component work begin, and only using the now-final code
   API — not a design in flux, not a "roughly what we plan to ship" version.

## Pre-flight (before touching the Figma file)

- [ ] The code contract is integrated (confirm the actual commit, not a promised one).
- [ ] The exact prop names, values, defaults, and states to mirror are read from the integrated
      source (component source + tests), not recalled from the ticket's original scope text.
- [ ] Any token this component/state needs already exists in
      `packages/tokens/src/tokens.css` with Light and Dark values. If it does not exist yet, that is
      a code-contract gap — fix it in code first; do not invent an equivalent value directly in
      Figma.
- [ ] No other Figma mutation is in flight (check with the primary agent / current session state).

## During Figma work

- [ ] Every fill, stroke, spacing, radius, typography, and effect value used is a **bound existing
      local variable or style** — never a raw/hardcoded value, never a detached copy of a variable.
- [ ] Every Figma component property maps 1:1 to a real code prop, or is documented as an
      instance-content mapping (e.g., text content, not a variant) if that's what the code contract
      actually uses. No Figma-only property or visual-only variant is created to "look complete."
- [ ] States that cannot be represented as live Figma interaction (hover, pressed, loading, etc.)
      are represented as clearly labeled **static references**, not silently omitted or faked as a
      real interactive state.
- [ ] Light and Dark bindings are validated for every new/changed node — not assumed from the Light
      result.
- [ ] Nearby documentation (usage, accessibility, deliberate exclusions) is attached per
      `DESIGN_SYSTEM_CHARTER.md` §8, using the same content the code side already committed to —
      not a paraphrase that could drift from it.
- [ ] If an existing component set cannot be read or mutated safely (e.g., a structural Plugin API
      error), **stop before mutating**. Inspect and report; do not repair, delete, or route around it
      without an explicit separate decision — this is the exact failure mode `DSV1-006` recorded and
      recovered from, and the Lesson in `LESSONS.md` ("Figma component-set recovery") generalizes it.

## Validation (before calling it done)

- [ ] Metadata and a screenshot are captured for every created/changed node.
- [ ] Every applied Figma value is traced back to the specific code token or prop it mirrors — this
      is the parity matrix a Figma-parity ticket must report, not just a "looks right" screenshot.
- [ ] The report separates **verified parity** from **access/API blockers** — a blocker (e.g., an
      unreadable component-set property, a plugin-API limitation) is recorded as exactly that, never
      quietly treated as parity achieved. `DSV2-004`'s acceptance criteria require this split
      explicitly.
- [ ] For a change touching existing, user-visible component sets: no legacy set is altered or
      removed before an explicit user visual-checkpoint approval, and if it is superseded it is
      archived (renamed + moved, node IDs preserved), not deleted — the `DSV1-006` precedent.
- [ ] Project records (`ISSUES.md`, `DECISIONS.md`, `PROJECT_OPERATIONS.md`'s Current state) are
      updated with the verified outcome once the work lands, per
      `COMPONENT_LIFECYCLE.md` §6 and §9.

## Resolved gap: typography variable binding (`DSV2-004`)

Figma's 9 typography text styles were previously not bound to number Variables for size/line-height
— a live `get_variable_defs` check on a sampled text node returned only the color-fill binding. This
is resolved: `DSV2-004` bound all 9 text styles' `fontSize`/`lineHeight` to the pre-existing
`Typography` collection's `size/*`/`line-height/*` FLOAT variables (which already carried correct
`codeSyntax.WEB` values matching `packages/tokens/src/tokens.css` — only the binding itself was
missing), and added the 10 `DSV2-001`/`DSV2-002` interaction/foundation variables that had no Figma
representation yet. See [`figma-tokens.md` §5–6](./figma-tokens.md#5--type--breakpoints) for the
verified value tables. No _component-set_ structural issue is open (that one was resolved via
`DSV1-006`; see `ISSUES.md`).

**Verification-tooling note found during this work:** `get_variable_defs` does not surface
variables bound at the text-style level, only variables bound directly on a node's own properties.
Do not use it alone to declare typography parity resolved or unresolved — cross-check
`TextStyle.boundVariables` via `use_figma` first.

## See also

- [`DESIGN_SYSTEM_CHARTER.md`](./DESIGN_SYSTEM_CHARTER.md) — token architecture and the
  minimum-documentation shape referenced above.
- [`COMPONENT_LIFECYCLE.md`](./COMPONENT_LIFECYCLE.md) — where this checklist's stage 5 fits in the
  full lifecycle.
- [`LESSONS.md`](./LESSONS.md) — the two Figma-mutation-safety lessons this checklist encodes.
- [`docs/tickets/DSV2-004-figma-foundation-parity.md`](./tickets/DSV2-004-figma-foundation-parity.md)
  — the next ticket that will execute against this checklist.
