# Story Coverage Gap Report: US-01 (v4 — V3 Story)

**Date:** 2026-03-25
**Story source:** `user-stories/update_03_US-01-math-utils.md`
**Based on:** `specs/US-01-gap-report-v3.md`

---

## What the story now covers
- Formula: `Total = Price * (1 + TaxRate)`, round half up to 2dp
- Bug: price exactly 100 (any format) → `(Price * (1 + TaxRate)) + 10.00`
- Boundary: exactly 1,000,000.00 allowed; strictly > 1,000,000.00 blocked
- Empty price → blocked; empty tax → defaults to 0
- Negative price → blocked; non-numeric → blocked
- Internal JS error → blocked with message
- Button disabled 500ms post-click
- Browsers: latest Chrome, Safari, Firefox
- JS required; no-JS out of scope
- Keyboard nav + semantic HTML required; WCAG out of scope
- 6 Gherkin scenarios covering happy path, bug (×2), rounding, sanitization, boundary

---

## Missing scenarios — QA-ADDED (v4)

| ID | Category | Missing scenario | Priority | Question for dev/PM |
|----|----------|-----------------|----------|---------------------|
| QA-037 | **Story gap** | Scenario 5 has no tax rate and no expected output — untestable as written | **High** | Add explicit tax rate and expected total. e.g., `$1,250.50` + tax `0.1` → "Total: 1375.55" |
| QA-038 | **Regression** | Negative tax rate behavior removed from V3 — was explicitly allowed in V2 (QA-005) | **High** | Is negative tax (discount) still allowed? Not mentioned in V3 validation table |
| QA-039 | Edge case | Price = 0 still has no Gherkin scenario — resolved in V2 but never tested | Medium | Confirm: price=0, any tax → "Total: 0.00" (no bug since 0 ≠ 100) |
| QA-040 | Error state | Internal JS error is in the validation table but has no Gherkin scenario | Medium | Add a scenario or note it as "tested via unit test only" |
| QA-041 | Business logic | Scenario 6 output shown as `1000000.00` — should large numbers display with commas? | Low | Is "Total: 1,000,000.00" or "Total: 1000000.00" the correct display format? |
| QA-042 | Sequence | Keyboard navigation is "required" but no acceptance criteria define Tab order or Enter behavior | Low | What is the expected Tab order? Does Enter on the button trigger calculation + 500ms disable? |
| QA-043 | Edge case | Rounding only tested in one direction (10.755 → rounds up). No test for rounding down | Low | Add a round-down scenario or confirm covered by unit tests |
| QA-044 | Edge case | Tax rate = 0, price ≠ 100 — not explicitly tested as a standalone scenario | Low | Confirm: price=50, tax=0 → "Total: 50.00" |

---

## Ambiguities still needing answers

1. **Scenario 5 (High):** No tax rate or expected total — cannot be automated without these values.
2. **Negative tax (High):** Dropped from V3 validation table without explanation — intentional or accidental?
3. **Large number display format (Low):** "1000000.00" vs "1,000,000.00" not specified.
4. **Keyboard nav spec (Low):** Marked "required" but no testable criteria defined.

---

## Recommendation

**ALMOST READY — 2 High items need clarification before test plan.**
V3 resolves all prior critical issues including the QA-019 math conflict. Fix Scenario 5 (add tax rate + expected value) and confirm negative tax behavior, then this story is clear for `/02.test-plan`.
