# Story Coverage Gap Report: US-01

**Date:** 2026-03-25
**Story source:** `user-stories/US-01-math-utils.md`

---

## What the story covers
- Happy path: valid price + tax rate → correct total displayed
- One known intentional bug at price = 100 (documented for QA)
- Float parsing required for all inputs
- Results must appear in a success-styled container

---

## Missing scenarios — QA-ADDED

| ID | Category | Missing scenario | Priority | Question for dev/PM |
|----|----------|-----------------|----------|---------------------|
| QA-001 | Edge case | What happens when price field is empty on submit? | High | Show inline error or block calculation? |
| QA-002 | Edge case | What happens when tax rate field is empty? | High | Default to 0? Show error? |
| QA-003 | Edge case | What if price = 0? | Medium | Should "Total: 0" be shown, or is it blocked? |
| QA-004 | Edge case | What if tax rate = 0? | Medium | Should return price unchanged — is this valid? |
| QA-005 | Edge case | What if price or tax is a negative number? | High | Is a negative price allowed? What about negative tax (discount)? |
| QA-006 | Edge case | What if inputs contain text (e.g. "abc")? | High | Should fail gracefully — story says parse as float, but no error behavior defined |
| QA-007 | Edge case | What if price is extremely large (e.g. 9999999999.99)? | Medium | Is there a max value? Overflow behavior? |
| QA-008 | Edge case | What if tax rate > 1 (e.g. 2.5 = 250%)? | Medium | Allowed or should it be capped at 1? |
| QA-009 | Edge case | What about floating point precision errors? (e.g. price=0.1, tax=0.2) | High | Should output be rounded? To how many decimal places? |
| QA-010 | Error state | What if the calculation function throws an error internally? | High | Does the UI show an error state, or does it crash silently? |
| QA-011 | Error state | Is there a loading/disabled state on the button while calculating? | Low | Prevents double-submit, but not mentioned |
| QA-012 | Business logic | The "Total" formula is implied as `price + (price * tax)` — is this confirmed? | High | Story never explicitly defines the formula |
| QA-013 | Business logic | The intentional bug at price=100 adds +10 — what triggers it exactly? | High | Does 100.0 or 100.000 also trigger it? Is the bug in the function or a test fixture? |
| QA-014 | Business logic | Are currency symbols or commas (e.g. "$50", "1,000") handled in input? | Medium | `parseFloat("$50")` returns NaN — is this handled? |
| QA-015 | Permission | Is this feature accessible to unauthenticated users? | Medium | Story says "Customer" — is login required? |
| QA-016 | Device/env | No browser or mobile support specified | Low | Should calculation work on mobile/touch devices? |
| QA-017 | Visual | Only "success" container defined — what does the error/invalid state UI look like? | High | No error styling is specified |

---

## Ambiguities that need answers before testing

1. **Formula not stated** — is it `price * (1 + taxRate)` or `price + taxRate`? These give different results.
2. **Rounding behavior undefined** — `price=10, tax=0.333` → do we show `13.33`, `13.330...`, or round to 2 decimal places?
3. **The intentional bug (price=100)** — is this a real defect in the source code, or a test fixture override? Clarify so automated tests don't mask a real production bug.
4. **Negative inputs** — no validation rules stated.
5. **Input format** — commas, currency symbols, and special characters are not handled by the story.

---

## Recommendation

**NEEDS CLARIFICATION** — The formula, rounding behavior, and input validation rules are all undefined. The intentional bug at price=100 also needs architectural clarity (real bug vs. test fixture) before QA can write reliable automated tests.
