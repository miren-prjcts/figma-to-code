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

## 2026-08-26 — Worktree-isolated agents can silently start from a stale base

A worktree-isolated execution agent (DSV2-001) was launched without first confirming that `origin/main` matched local `main`. Local `main` had 10 commits (all of DS v1's component work, the controlled-dialog Modal implementation, and the pnpm alignment) that had never been pushed. The tool's built-in worktree isolation based the agent's checkout on `origin/main`, 7 commits behind — the agent unknowingly edited a pre-accessible-Modal version of `modal.tsx` and would have regressed the focus-trap/scroll-lock/portal implementation if its diff had been merged as-is. The staleness was only caught because the integrating session diffed the agent's final files against the _current_ real files before merging, rather than trusting `git merge` or the agent's own "typecheck/test/lint/build all passed" report — the checks passed because they ran inside the stale worktree, consistent with the stale files, not because the work was correct against the real codebase.

**Before launching any worktree-isolated agent:** run `git log --oneline origin/<default-branch>..<default-branch>` (or equivalent) first. If local is ahead, either push first or create the worktree manually from the local branch tip (`git worktree add <path> <local-branch>`) instead of relying on default isolation. **Before integrating any agent's work, regardless of isolation method:** diff the agent's final file contents against the current real files on the target branch, not just against the agent's own starting commit — a clean self-reported diff can still be wrong if the base it diffed from was wrong. Do not treat a subagent's verification report as sufficient evidence on its own; re-run the verification suite on the real integration target after merging.
