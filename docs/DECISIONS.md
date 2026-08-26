# Decisions

## 2026-08-25 — Repository ownership

`miren-prjcts/figma-to-code` is the only project repository. Do not use or sync work to `ds-starter`.

## 2026-08-25 — Typography

Geist is the canonical sans-serif family and Geist Mono is the canonical monospace family in code and Figma.

## 2026-08-25 — Design-system v1 foundations

Build a local code-backed Figma library. Do not reuse Material 3 or attached external libraries as the implementation system.

## 2026-08-26 — Golden Pact

The project follows the approval-gated, supervisor-led workflow in `AGENTS.md` and `docs/PROJECT_OPERATIONS.md`. No ticket execution begins without explicit approval after tickets and model assignments are presented. The primary agent supervises no more than five active agents.

## 2026-08-26 — DS v1 dialog contract

Modal is a controlled dialog with explicit close-request reasons, opt-in backdrop dismissal, focus containment/return, and scroll locking. The implementation remains project-owned and does not introduce a runtime dialog dependency.
