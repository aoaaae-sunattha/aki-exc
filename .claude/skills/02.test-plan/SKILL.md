# Skill: Create Test Plan (Skill 02)
# Usage: /test-plan [story-id]
# Example: /test-plan login-fix

## Input
- STORY_ID = $ARGUMENTS
- If empty → ask user for story ID before continuing
- Source: use the PR diff / risk summary already in context from Skill 01

## Step 1 — Identify testable areas
- Read the PR diff summary from context
- List every UI element, API, or feature that was touched

## Step 2 — Map to test scenarios
For each changed area create at least one scenario:
- Happy path (normal use)
- Error/edge case (empty input, invalid data, boundary values)
- Risk case (the thing most likely to break)

## Step 3 — Define test data
For each input field or API parameter:
| Field | Valid value | Invalid value | Boundary value |

## Step 4 — Write pre-conditions
List everything that must be true before tests run:
- User must be logged in / logged out?
- Specific data must exist in the system?
- Feature flags or env vars required?

## Output — save to file

# Test Plan: {{STORY_ID}}
**Date:** [today]
**Source:** PR diff from Skill 01

## Test scenarios
| ID | Scenario | Priority | Type | Expected result |
|----|----------|----------|------|-----------------|
| TC-001 | ... | High | Functional | ... |

## Test data
| Field | Valid | Invalid | Boundary |
|-------|-------|---------|----------|

## Pre-conditions
[list]

Save to: specs/{{STORY_ID}}-test-plan.md