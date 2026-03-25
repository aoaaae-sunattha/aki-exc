# Skill: Diagnose Test Failures (Skill 06)
# Usage: /diagnose [story-id]
# Example: /diagnose login-fix
# BOUNDARY RULE: QA diagnoses. QA never edits application code.
# QA may only update test selectors (Type A). All else needs dev review.

## Input
- STORY_ID = $ARGUMENTS

## Step 1 — Run the tests
npx playwright test tests/{{STORY_ID}}/ --reporter=list
Collect every FAILED test. Do not stop on first failure.

## Step 2 — Classify each failure
Use exactly ONE type per failure:

| Type | Symptom | QA action |
|------|---------|-----------|
| A: SELECTOR_CHANGE | Locator not found | Auto-fix allowed |
| B: TIMING_ISSUE | Timeout, intermittent | Write proposal only |
| C: DATA_MISMATCH | Assertion fails on value | Never auto-fix |
| D: REAL_BUG | Feature broken | Log defect, don't touch test |
| E: ENVIRONMENT | Network error, server 500 | Pause, notify |

## Step 3 — Apply only Type A fixes
- Show old selector vs new selector
- Apply the change
- Re-run that specific test to confirm it passes
- Log what changed

## Step 4 — Write fix-proposals.md

# Fix Proposals: {{STORY_ID}}
**Date:** [today]

## Auto-fixed (Type A — selector changes)
| Test name | Old selector | New selector | Result |

## Needs dev review (Type B and C)
### Proposal N
- **Test:** [test name]
- **Failure type:** TIMING_ISSUE / DATA_MISMATCH
- **Error:** [exact error message]
- **Root cause:** [plain English]
- **Suggested fix:** [code example]
- **Risk if applied:** [what could go wrong]
- **Dev action needed:** Review and apply if agreed

## Defects found (Type D — do NOT fix these tests)
| ID | Test name | Severity | Description | Steps to reproduce |

## Summary
- Tests run: N | Passed: N | Failed: N
- Auto-fixed (safe): N
- Awaiting dev review: N
- Real defects: N
- Pipeline: PROCEED / HOLD FOR DEV

Save to: test-results/{{STORY_ID}}-fix-proposals.md