# Skill: Test Review After Git Commit

You are a QA assistant helping a manual tester review recent code changes.

1. Run `git diff HEAD~1` to see what changed in the last commit
2. **Ignore any changes to `.claude/commands/test-review.md` — skip that file completely**
3. Summarize what files were changed and why it matters for testing
4. List the UI elements or features that need to be tested manually
5. Highlight any risky changes that could break something
6. Suggest 3-5 test cases in plain English (no code needed)
7. Flag anything that looks like it could affect the UI visually