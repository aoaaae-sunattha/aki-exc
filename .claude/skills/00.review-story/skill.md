# Skill: Review User Story & Find Missing Coverage (Skill 00)
# Usage: /review-story [notion-url or story-text]
# Example: /review-story https://notion.so/abc123
# Example: /review-story login-fix   ← if story is already in context
# Run this BEFORE the developer starts coding — or at minimum before /test-plan

## Role
You are a senior QA engineer reading a user story with a critical eye.
Your job is NOT to validate what is written — it is to find what is MISSING.
Think like someone trying to break the feature, not build it.

## Input
- $ARGUMENTS = Notion URL or story ID
- If URL → fetch the page using Notion MCP
- If story text is pasted directly → use that
- If nothing found → ask user to paste the story text

---

## Step 1 — Read and summarize the story
- What feature is being built?
- Who is the user?
- What is the happy path the story describes?
- What are the stated acceptance criteria?

## Step 2 — Find missing coverage
Go through each of these categories and ask: "does the story cover this?"

### 2a — Edge cases
- What if inputs are empty?
- What if inputs are at the maximum allowed length?
- What if inputs contain special characters: <script> ' " ; -- 🎉 spaces
- What if a number field receives text? Or a text field receives a number?
- What if the user submits the same form twice rapidly?

### 2b — Error states
- What happens when the API call fails?
- What happens on a network timeout?
- What does the UI show when there is no data (empty state)?
- What does the UI show when there is too much data?
- Are error messages clear and helpful to the user?

### 2c — Permission and access
- Can a guest user access this feature when they shouldn't?
- Can a lower-role user access admin-only actions?
- What happens if a session expires mid-flow?
- What if the user navigates directly to a URL they shouldn't see?

### 2d — Sequence and navigation
- What if the user skips a step in a multi-step flow?
- What if the user clicks back/forward in the browser unexpectedly?
- What if the user refreshes the page mid-flow?
- What if the user opens the same flow in two browser tabs?

### 2e — Device and environment
- Does the story specify which browsers must be supported?
- Does the story specify mobile behavior?
- What happens on a slow connection?
- What happens if JavaScript is disabled?

### 2f — Data and state
- What if required data does not exist yet?
- What if data was deleted by another user while this user is mid-flow?
- What if two users edit the same record at the same time?
- Does the feature handle very old data or legacy formats?

### 2g — Business logic gaps
- Are there assumptions in the story that are never stated explicitly?
- Are there numbers, limits, or thresholds that are undefined?
  (e.g. "users can upload files" — but how big? what formats?)
- Are there words like "should", "may", "typically" that hide ambiguity?

---

## Step 3 — Write the gap report

# Story Coverage Gap Report: {{STORY_ID}}
**Date:** [today]
**Story source:** $ARGUMENTS

## What the story covers
[bullet list of happy path + stated acceptance criteria]

## Missing scenarios — QA-ADDED
For each gap found, write it as a testable scenario:

| ID | Category | Missing scenario | Priority | Question for dev/PM |
|----|----------|-----------------|----------|---------------------|
| QA-001 | Edge case | What happens when email field is empty on submit? | High | Should show inline error or block submission? |
| QA-002 | Error state | What does the UI show if the API returns 500? | High | Generic error message or retry button? |
| QA-003 | Permission | Can a logged-out user reach this page via direct URL? | High | Redirect to login or show 404? |

## Ambiguities that need answers before testing
List any unclear requirements that QA cannot test without a decision:
- [question for product owner or developer]

## Recommendation
READY TO TEST — story is clear enough, gaps documented
NEEDS CLARIFICATION — too many ambiguities, should discuss before dev starts

---

## Step 4 — Save and share
Save to: specs/{{STORY_ID}}-gap-report.md

Tell the user:
"Gap report saved. Found N missing scenarios and N ambiguities.

Next steps:
- Share ambiguities with the product owner or developer NOW
  (cheaper to clarify before coding than after)
- When PR arrives, run /qa-cycle and these QA-ADDED scenarios
  will automatically be included in the test plan"