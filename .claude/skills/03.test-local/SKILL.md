# Skill: Test on Local Server (Skill 03)
# Usage: /test-local [url or feature]
# Example: /test-local http://localhost:3000
# Example: /test-local http://localhost:8080/index.html
# Example: /test-local login   ← tests login on default URL

## Parse argument
- If $ARGUMENTS starts with http → APP_URL = $ARGUMENTS, FOCUS = full page
- If $ARGUMENTS is a feature name → APP_URL = http://localhost:8080/index.html, FOCUS = $ARGUMENTS
- If empty → APP_URL = http://localhost:8080/index.html, FOCUS = full page

## Important: load test plan first
- Read specs/{{STORY_ID}}-test-plan.md if it exists
- You already know what to look for — check those areas first
- Do not click randomly — follow the plan

## Step 1 — Baseline screenshot
- Open APP_URL with Playwright Browser MCP
- Screenshot: test-results/screenshots/local-baseline.png
- Log: page title, visible elements, any console errors

## Step 2 — Test against the plan
For each scenario in the test plan:
- Perform the action
- Log: what you expected vs what happened
- Screenshot if anything looks wrong

## Step 3 — Quick sanity checks
- All buttons clickable?
- All forms submittable?
- Any broken images or missing text?
- Console errors? (log them all)
- Mobile width check at 375px

## Step 4 — Log observations

# Local Test: {{APP_URL}}
**Date:** [today]
**Focus:** {{FOCUS or "full page"}}

## Observations
| # | Action | Expected | Actual | Screenshot | Issue? |
|---|--------|----------|--------|-----------|--------|

## Console errors
[list any JS errors found]

## Verdict
PASS / ISSUES FOUND / BROKEN

Save to: test-results/{{STORY_ID}}-local.md