# DSV1-004 — Serialized Figma Parity and Documentation

## Dependency

`DSV1-001` through `DSV1-003` must be integrated and approved by the primary agent. This ticket is performed serially by the primary agent; no parallel Figma mutations are permitted.

## Objective

Create one local Figma component set each for Button, Input, Badge, StatCard, and Modal, exactly matching the integrated code APIs.

## Scope

- Use existing local variables, Geist styles, named size/radius variables, and effect styles.
- Use exact code prop names, values, and defaults. Do not create visual-only variants.
- Provide compact static state references for interactive states, clearly labelled where behavior itself cannot be represented statically.
- Add nearby usage, accessibility, and deliberate-exclusion documentation.
- Validate Light and Dark semantic-token bindings.

## Acceptance criteria

- The Components page contains exactly the five scoped local component sets and their documentation; no future component families are added.
- Every Figma property and visible state has an implemented, tested code path.
- Components use bound local variables/styles rather than raw values or detached copies.
- Code Connect is deliberately excluded from this v1 ticket.

## Handoff

Provide a component/API parity matrix, node links or identifiers, semantic-binding evidence, and a list of static-only behavioral references.
