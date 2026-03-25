# Skill: Post QA Report to Notion (Skill 08a — optional)
# Usage: /notify-notion [notion-url] [story-id]
# Example: /notify-notion https://notion.so/abc123 login-fix
# This skill is OPTIONAL — only run it after you have reviewed the report yourself.

## Parse arguments
- Argument 1 = NOTION_URL
- Argument 2 = STORY_ID
- If either missing → stop and ask the user to provide both

## Step 1 — Read the report
- Read file: test-results/{{STORY_ID}}-report.md
- If not found → tell user to run /report first, then come back

## Step 2 — Post to Notion
Use the Notion MCP tool to append content to the page at NOTION_URL.

Post this structure:

---
## QA Report — {{STORY_ID}}
**Date:** [today]
**Tested by:** AI QA Pipeline

### Verdict
[SHIP / SHIP WITH KNOWN ISSUES / DO NOT SHIP] — one line reason

### Test results
| Metric | Value |
|--------|-------|
| Total tests | N |
| Passed | N |
| Failed | N |
| Bugs found | N |

### Defects found
[copy defect table from report — if none write "No defects found"]

### Exploratory findings
[copy from report — 2-3 sentences]

### Fix proposals awaiting dev
[copy from report — or "None"]

### Recommendation
[copy full recommendation from report]
---

## Step 3 — Confirm to user
Tell the user:
- Report posted to: [NOTION_URL]
- Verdict: [SHIP / HOLD / DO NOT SHIP]
- Next step:
  - If SHIP → notify dev team they can merge
  - If HOLD → wait for dev to fix, then re-run /qa-cycle