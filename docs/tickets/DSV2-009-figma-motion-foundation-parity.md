# DSV2-009 — Serialized Figma Motion and Elevation Foundation Parity

## Dependency

`DSV2-008` is integrated and reviewed. Figma work is serialized through the primary agent, per
`FIGMA_PARITY_CHECKLIST.md` and `COMPONENT_LIFECYCLE.md` §5.

## Objective

Bring the motion, elevation, and layering foundations to verified parity with the integrated code
contract, and create the `Foundations / Motion` page named in `BACKLOG.md`'s Phase 0 scope.

## Scope

- Create a new `Foundations / Motion` page, positioned after `Foundations / Icons`, following the
  one-category-one-page convention established 2026-08-27. Document the `--duration-*`/`--easing-*`
  tokens. Verify via the Plugin API whether Figma Variables support the value types needed (easing
  curves in particular); if not, document the actual mechanism used (e.g., annotated reference
  values) rather than assuming Variable support from the editor UI.
- Bind the expanded elevation scale as Figma Effect styles/Variables, Light and Dark, replacing or
  aliasing the existing single `shadow-soft` effect style per however `DSV2-008` resolved that
  question.
- Bind the expanded `--layer-*` z-index scale as Figma Variables (Semantic collection, single mode,
  theme-invariant), verified via `get_variable_defs` rather than assumed from the editor — the same
  discipline `DSV2-004` used for typography.
- Verify the existing `Foundations / Icons` page explicitly names Phosphor as the documented icon
  source; add that statement if the page currently shows only the three installed icon components
  without naming the source library. No new icon components, no icon system rebuild.
- Run a document-wide instance scan (`findAllWithCriteria` or equivalent) after every mutation and
  confirm zero broken instances, per the 2026-08-27 precedent.

## Deliberate exclusions

- Modal's enter/exit transition has no static Figma representation. Document this as a known
  Figma-side limitation instead of rigging a Figma Smart Animate transition that has no code
  equivalent — Charter §2's "no Figma-only property" rule applies to motion the same as any other
  visual feature.
- Any component-set repair, replacement, or property change — this ticket is foundations-only, the
  same boundary `DSV2-004` held.

## Acceptance criteria

- Every applied Figma value or page addition is traceable to an integrated `DSV2-008` token.
- No Figma-only token or visual-only motion feature is introduced.
- `Foundations / Icons` explicitly names Phosphor as the icon source, verified by reading the page's
  actual text content, not assumed.
- A document-wide instance scan shows zero broken instances after the change.

## Handoff

Report the parity matrix, the exact mechanism used for motion tokens in Figma (Variables vs.
documented reference), verification evidence, and any residual API limitation for the Phase 0
review.
