# Lessons Learned

## 2026-08-25 — Figma token parity

Primitive colors must exist as explicit code tokens when semantic color variables need to alias them in Figma. This preserves one-to-one code syntax and avoids hardcoded Figma values.

## 2026-08-25 — Shared Figma mutation safety

Figma writes should be sequential. Inspect and validate after each phase; do not allow parallel agents to mutate the same library file.

## 2026-08-25 — Auto-layout documentation frames

Set documentation frames and nested auto-layout containers to hug content vertically. Fixed one-pixel heights can leave content overflowing and make pages appear blank in screenshots.

## 2026-08-26 — Approval boundaries

Creating tickets does not authorize execution. Confirm whether the user wants planning only, ticket creation, or implementation before dispatching work.

## 2026-08-26 — Figma component-set recovery

If Figma reports a component-set property error, stop before a mutation. Existing component sets are user-owned state unless their exact creation IDs are in the current run ledger; inspect or obtain explicit approval for a controlled replacement rather than deleting them by name.
