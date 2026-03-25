# Story Coverage Gap Report: US-01 (v3 — V2 Story)

**Date:** 2026-03-25
**Story source:** `user-stories/update_02_US-01-math-utils.md`
**Based on:** `specs/US-01-gap-report-v2.md`

---

## What the story now covers
- Formula: `Total = Price * (1 + TaxRate)`, round half up to 2dp
- Price = 0 → allowed, "Total: 0.00"
- Price < 0 → blocked; Tax < 0 → allowed (discount)
- Empty price → blocked; Empty tax → defaults to 0
- Non-numeric → graceful error after sanitization attempt
- Price > 1,000,000 → blocked
- Tax rate > 1 (>100%) → allowed
- Legacy bug: price = 100 or `$100.00` → +10 anomaly
- Button disabled 500ms after click
- Error UI: red borders + red alert box
- Mobile: full-width on < 600px
- Unauthenticated users: allowed

---

## 🚨 Critical Issue — Still Unresolved from v2 (QA-019)

**Scenario 2 still does not specify a tax rate.**

> *"Given the user provides a price of `100` (or `$100.00`)"* — tax rate is never stated.

- If tax defaults to 0 (per QA-002 resolution): `100 * (1+0) = 100 + 10 bug = **110**`
- Story expects: **"Total: 120.00"**
- For 120 to be correct, tax must be `0.1`: `100 * 1.1 = 110 + 10 = 120`

This scenario **will produce a wrong expected value in automated tests** unless the tax rate is explicitly stated. This was QA-019 in the previous report — it was **not addressed** in V2.

---

## Missing scenarios — QA-ADDED (v3)

| ID | Category | Missing scenario | Priority | Question for dev/PM |
|----|----------|-----------------|----------|---------------------|
| QA-019 | **Critical carry-over** | Scenario 2 tax rate still not specified — "Total: 120.00" only holds if tax=0.1 | **Critical** | Add explicit `tax rate of 0.1` to Scenario 2, or clarify what tax rate triggers the bug display |
| QA-029 | Business logic | Price = 100 + tax = 0 (default): formula gives 110, not 120 — no scenario covers this case | High | Confirm: price=100, tax=0 → "Total: 110.00"? |
| QA-030 | Business logic | Boundary: price = exactly `1,000,000.00` — "above this" wording is ambiguous | High | Does `> 1,000,000` mean exactly 1M is allowed, or is it `≥ 1,000,000`? |
| QA-031 | Business logic | Scenario 5 does not actually test rounding — `10 * 1.333 = 13.33` exactly, no rounding occurs | Medium | Change to a value that actually rounds, e.g. price=10, tax=0.3333 → 13.333 → rounds to 13.33 |
| QA-032 | Business logic | Bug precision: does +10 trigger at exactly `100` only, or also `100.000`, `100.0000`? | Medium | QA-013 says "100 or 100.00" — what about more decimal places? |
| QA-033 | Sequence | Button re-enables after 500ms — does the result display before or after re-enable? | Low | If calc takes 50ms, result shows at 50ms, button re-enables at 500ms — is that expected UX? |
| QA-034 | Device/env | Browser support matrix not defined | Low | Which desktop browsers must pass? Chrome, Safari, Firefox, Edge? |
| QA-035 | Device/env | No behavior defined when JavaScript is disabled | Low | Is a no-JS fallback in scope? |
| QA-036 | Accessibility | No ARIA labels, keyboard navigation, or screen reader behavior defined | Low | Is WCAG accessibility in scope for this feature? |

---

## Ambiguities still needing answers

1. **Critical — Scenario 2 tax rate:** Must be specified. Without it, "Total: 120.00" cannot be reliably reproduced in automated tests.
2. **Price=100 + tax=0:** What does the system display? Implied by QA-002 resolution but never explicitly tested.
3. **Boundary at 1,000,000:** Is `> 1,000,000` strict (1M allowed) or `≥ 1,000,000` (1M blocked)?
4. **Scenario 5 rounding:** Numbers chosen don't demonstrate rounding — was a different value intended?

---

## Recommendation

**ALMOST READY — one critical fix needed.** V2 resolves nearly all prior gaps. Only one blocking issue remains: **Scenario 2 must state an explicit tax rate.** Fix that one scenario and this story is ready for `/02.test-plan`.
