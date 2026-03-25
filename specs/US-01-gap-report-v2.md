# Story Coverage Gap Report: US-01 (v2 — Updated Story)

**Date:** 2026-03-25
**Story source:** `user-stories/update_01_US-01-math-utils.md`
**Based on:** `specs/US-01-gap-report.md` (previous review)

---

## What the story now covers
- Formula: `Total = Price * (1 + TaxRate)`, round half up to 2 decimal places
- Input sanitization: strips `$`, commas, spaces before parsing
- Empty price → blocked ("Price is required.")
- Empty tax rate → defaults to 0
- Negative price → blocked
- Negative tax → allowed (discount)
- Non-numeric → blocked ("Please enter a valid number.")
- Price > 1,000,000 → blocked
- Known bug: price = 100 or 100.00 adds +10 to result
- Error UI: red border + red alert box below button
- Mobile: full-width inputs/buttons on screens < 600px
- 8 Gherkin scenarios including rounding, sanitization, negative tax

---

## 🚨 Story Inconsistency Found (Critical)

**Scenario 4 contains a mathematical conflict with the stated bug behavior.**

| | Scenario 2 | Scenario 4 |
|--|-----------|-----------|
| Price | 100 | 100 |
| Tax rate | *(not stated — assumed 0.1?)* | 0 (empty → default) |
| Formula result | `100 * 1.1 = 110` | `100 * 1.0 = 100` |
| Bug (+10) | `110 + 10 = 120` ✓ | `100 + 10 = 110` ≠ 120 ✗ |
| Story says | "Total: 120.00" | **"Total: 120.00"** ← wrong |

Scenario 4 should display **"Total: 110.00"**, not "Total: 120.00". Either the scenario is wrong, or the bug behaves differently than "+10 always". This must be resolved before writing automated tests.

---

## Missing scenarios — QA-ADDED (v2)

| ID | Category | Missing scenario | Priority | Question for dev/PM |
|----|----------|-----------------|----------|---------------------|
| QA-018 | **Story conflict** | Scenario 4 shows Total: 120.00 for price=100, tax=0 — formula gives 110.00 | **Critical** | Is 120 or 110 the correct expected value? Is the bug additive (+10) or multiplicative? |
| QA-019 | **Story gap** | Scenario 2 does not specify the tax rate used | **High** | What tax rate is assumed? If 0.1, then "Total: 120.00" is consistent — but this must be stated |
| QA-020 | Edge case | Price = 0 (not negative, not empty, not > max) | High | Is $0 a valid price? Should "Total: 0.00" display, or is it blocked? |
| QA-021 | Edge case | Price = exactly 1,000,000.00 (boundary value) | Medium | Validation says `> 1,000,000` is blocked — so exactly 1M should pass. Confirmed? |
| QA-022 | Edge case | Tax rate has no upper bound defined | Medium | Is 10.0 (1000% tax) a valid input? Should there be a max? |
| QA-023 | Edge case | Input `$100` after sanitization becomes `100` — does the bug trigger? | High | Scenario 8 tests `$1,000` (no bug), but `$100` → 100 → bug. Is this tested and expected? |
| QA-024 | Error state | No behavior defined if internal JS throws an error (e.g. NaN slips through) | High | Does the UI show a fallback error or crash silently? |
| QA-025 | Sequence | Double-click / rapid submit — button not disabled after first click? | Medium | Should the button be disabled while calculating to prevent duplicate submissions? |
| QA-026 | Device/env | No desktop browser support matrix defined | Low | Which browsers must pass? Chrome, Safari, Firefox? |
| QA-027 | Device/env | Behavior with JS disabled not specified | Low | Is a no-JS fallback needed, or is it out of scope? |
| QA-028 | Business logic | Negative tax + price = 100 (Scenario 6) expected "Total: 100.00" — bug applied after discount? | Medium | Confirm: `100*(1-0.1)+10=100` is the intended calculation path |

---

## Ambiguities that still need answers

1. **Critical — Scenario 4 vs. bug behavior:** Does the +10 bug apply regardless of tax rate? If so, Scenario 4's expected value is wrong (110, not 120).
2. **Scenario 2 tax rate:** Not stated. Implicit assumption of `0.1`? Must be explicit for automated tests.
3. **Price = 0:** Falls outside all defined validation rules — expected behavior undefined.
4. **Tax rate upper bound:** No maximum stated. Unlimited tax rates could produce unexpectedly large outputs.
5. **Sanitized `$100` input:** Bug interaction with sanitized inputs not explicitly tested.

---

## Recommendation

**NEEDS CLARIFICATION** — The story is significantly improved over v1 and resolves most prior gaps. However, a **critical mathematical inconsistency in Scenario 4** must be fixed before QA can write reliable automated tests. Scenarios 2 and 4 contradict each other on the bug's expected output.
