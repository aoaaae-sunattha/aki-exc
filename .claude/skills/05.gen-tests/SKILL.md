# Skill: Generate Playwright Test Scripts (Skill 05)
# Usage: /gen-tests [story-id]
# Example: /gen-tests login-fix

## Input
- STORY_ID = $ARGUMENTS
- Read: specs/{{STORY_ID}}-test-plan.md
- Read: test-results/{{STORY_ID}}-observations.md
- APP_URL from context (or ask user if unknown)

## Rules for generated code
- Use TypeScript Playwright syntax
- Every test must have a descriptive name
- Use page.getByRole() and page.getByLabel() — avoid CSS selectors
- Each test must be fully independent (no shared state between tests)
- Include assertions for: visible elements, URL changes, error messages, success messages
- Add a comment above each test citing the TC-ID from the plan

## Output structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('{{FEATURE_NAME}}', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('{{APP_URL}}');
  });

  // TC-001: {{scenario description}}
  test('should {{expected behavior}}', async ({ page }) => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Coverage requirement
- Every TC-ID in the test plan must have at least one test
- Every MAJOR or BLOCKER bug from observations must have a regression test

## Output
Save all spec files to: tests/{{STORY_ID}}/
File naming: {{feature}}.spec.ts