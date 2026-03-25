# Skill: Review GitHub PR or Branch (Skill 01)
# Usage: /test-pr [pr-url or branch-name]
# Example: /test-pr https://github.com/org/repo/pull/42
# Example: /test-pr feature/login

## Parse argument
- If $ARGUMENTS starts with http → PR_URL = $ARGUMENTS, fetch the PR page
- If $ARGUMENTS is a branch name → run: git diff main..$ARGUMENTS
- If $ARGUMENTS is a number → run: git diff HEAD~$ARGUMENTS
- If empty → run: git diff HEAD~1 (last commit)

## Step 1 — Get the diff
- Fetch the diff using the method above
- IGNORE all changes to .claude/commands/*.md files — skip them completely

## Step 2 — Summarize changes
- List every file changed (excluding .claude/commands/)
- For each file: one sentence explaining what changed and why it matters for testing

## Step 3 — Risk assessment
Classify each changed area:
| Risk | Meaning |
|------|---------|
| HIGH | Auth, payments, database, core logic |
| MEDIUM | UI layout, form validation, API calls |
| LOW | Styling, copy changes, minor tweaks |

## Step 4 — Output summary

# PR Review: $ARGUMENTS
**Date:** [today]

## Files changed
| File | What changed | Risk |
|------|-------------|------|

## Risk areas to focus on
List top 3 areas that need the most testing attention.

## Recommended test focus
Plain English — what should the tester specifically check?