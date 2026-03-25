# Skill: Exploratory Testing (Skill 04)
# Usage: /explore [app-url]
# Example: /explore http://localhost:3000

## Input
- APP_URL = $ARGUMENTS (default: http://localhost:8080/index.html)

## Role
You are a skilled manual tester exploring the app AS IF you were
a real user trying to break things. Think out loud. Go beyond the plan.

## Step 1 — Open the app
- Navigate to APP_URL using Playwright Browser MCP
- Screenshot the starting state: test-results/screenshots/explore-start.png

## Step 2 — Follow test plan scenarios
- Read specs/{{STORY_ID}}-test-plan.md
- Execute each scenario from the plan
- After EVERY action: log expected vs actual

## Step 3 — Try to break it
Intentionally attempt these:
- Submit completely empty forms
- Use special characters in every input: <script> ' " ; -- emoji 🎉
- Click buttons multiple times rapidly
- Resize browser to 375px (mobile)
- Navigate back/forward at unexpected moments
- Refresh mid-flow
- Use very long strings (500+ characters)

## Step 4 — Observation log

### Observation {{N}}
- **Action:** [what you did]
- **Expected:** [what should happen]
- **Actual:** [what actually happened]
- **Screenshot:** [filename]
- **Bug found:** YES / NO
- **If YES:** describe severity — BLOCKER / MAJOR / MINOR

## Output
Save to: test-results/{{STORY_ID}}-observations.md
Screenshots to: test-results/screenshots/{{STORY_ID}}-explore-*.png