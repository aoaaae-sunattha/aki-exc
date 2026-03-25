# Skill: Full QA Cycle (Master)
# Usage: /qa-cycle [pr-url-or-branch] [story-id] [app-url]
# Example: /qa-cycle https://github.com/org/repo/pull/42 login-fix http://localhost:3000
# Example: /qa-cycle feature/login login-fix http://localhost:8080/index.html

## Parse arguments
- Argument 1 = PR_TARGET (GitHub PR url or branch name)
- Argument 2 = STORY_ID (short name e.g. login-fix)
- Argument 3 = APP_URL (default: http://localhost:8080/index.html)
- If any argument is missing → ask the user before continuing

## Note on Skill 00
/review-story should ideally be run BEFORE this cycle starts —
while the story is being written or before dev begins coding.
If you have already run it, the gap report will be picked up
automatically in Step 2 (test plan).
If you have not run it yet, run it now before continuing:
/review-story [notion-url or story-id]

---

## Step 1 — Review the PR or branch
Run skill: /test-pr {{PR_TARGET}}
- Ignore any changes to .claude/commands/*.md files completely
- Summarize what changed and list risky areas
- Ask user: "Risk areas identified. Ready to create test plan? (yes/no)"

## Step 2 — Create test plan
Run skill: /test-plan {{STORY_ID}}
- Use the PR diff from Step 1 as the requirements source
- ALSO read specs/{{STORY_ID}}-gap-report.md if it exists
  and include all QA-ADDED scenarios from the gap report
- Mark QA-added scenarios clearly with [QA-ADDED] tag in the plan
- Save to: specs/{{STORY_ID}}-test-plan.md
- Ask user: "Test plan ready. Continue to local testing? (yes/no)"

## Step 3 — Test on local server WITH the plan
Run skill: /test-local {{APP_URL}}
- Load the test plan from Step 2 first — know what to look for
- Test the specific areas flagged in the plan
- Pay extra attention to QA-ADDED scenarios
- Take screenshots of anything unexpected
- Save observations to: test-results/{{STORY_ID}}-local.md

## Step 4 — Exploratory testing
Run skill: /explore {{APP_URL}}
- Go beyond the plan — try to break things
- Submit empty forms, use special characters, click rapidly
- Resize the browser, navigate back/forward unexpectedly
- Refresh mid-flow, open in two tabs simultaneously
- Save observations to: test-results/{{STORY_ID}}-observations.md

## Step 5 — Generate Playwright test scripts
Run skill: /gen-tests {{STORY_ID}}
- Convert test plan + observations into Playwright .spec.ts files
- QA-ADDED scenarios must each have at least one test
- Save to: tests/{{STORY_ID}}/

## Step 6 — Diagnose failures
Run skill: /diagnose {{STORY_ID}}
- Run the generated tests: npx playwright test tests/{{STORY_ID}}/
- Classify each failure using the 5-type table:
  - A: SELECTOR_CHANGE → auto-fix allowed
  - B: TIMING_ISSUE → write proposal only
  - C: DATA_MISMATCH → never auto-fix
  - D: REAL_BUG → log defect, do not touch test
  - E: ENVIRONMENT → pause, notify
- Save fix-proposals.md

## Step 7 — Generate report
Run skill: /report {{STORY_ID}}
- Compile all findings into: test-results/{{STORY_ID}}-report.md
- Include a section: "QA-added scenarios coverage" showing which
  gap report scenarios passed, failed, or need clarification
- Print the verdict clearly: SHIP / HOLD / DO NOT SHIP

---

## Pause here — wait for user review
After Step 7 stop and show:

"QA cycle complete for {{STORY_ID}}.

Verdict: [SHIP / HOLD / DO NOT SHIP]
Bugs found: N
QA-added scenarios tested: N
Report saved to: test-results/{{STORY_ID}}-report.md

What would you like to do next?
  A) Post to Notion ticket  → /notify-notion [notion-url] {{STORY_ID}}
  B) Create GitHub issue    → /create-github-issue {{STORY_ID}}
  C) Both A and B
  D) Nothing — I will handle it manually"

Wait for user choice before doing anything else.

---

## If bugs found (HOLD or DO NOT SHIP)
Dev fixes the bug and pushes → re-run from the top:
/qa-cycle [new-pr-or-branch] {{STORY_ID}} {{APP_URL}}

## QA boundary rules — never break these
- Never edit application source code
- Never merge a PR
- Never close a Notion ticket — dev must confirm fix
- Never close a GitHub issue — dev must confirm fix
- Only auto-fix Type A (selector changes) in test files