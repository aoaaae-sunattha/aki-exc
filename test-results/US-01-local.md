# Local Test: http://localhost:8080/index.html
**Date:** 2026-03-25
**Focus:** Math Utils (Tax Calculator)
**Spec:** user-stories/update_03_US-01-math-utils.md
**Method:** Static JS extraction + Node.js execution (server was not running)

---

## Observations

| # | Action | Expected | Actual | Issue? |
|---|--------|----------|--------|--------|
| Sc1 | price=50, tax=0.1 | `Total: 55.00` | `Total: 55` | ❌ No decimal formatting |
| Sc2 | price=100, tax=0.1 (bug) | `Total: 120.00` | `Total: 120 (Includes the hidden bug!)` | ❌ No formatting + out-of-spec annotation |
| Sc3 | price=100, tax=empty | `Total: 110.00` | `Total: NaN` | ❌ Empty tax not defaulted to 0 |
| Sc4 | price=10, tax=0.0755 | `Total: 10.76` | `Total: 10.755` | ❌ No rounding |
| Sc5 | price=$1,250.50, tax=0.1 | `Total: 1375.55` | `Total: NaN` | ❌ No input sanitization |
| Sc6 | price=1000000, tax=0 | `Total: 1000000.00` | `Total: 1000000` | ❌ No decimal formatting |
| Val1 | Empty price | BLOCK: "Price is required." | `Total: NaN` | ❌ No validation |
| Val2 | price=-25 | BLOCK: "Price cannot be negative." | `Total: -27.5` | ❌ No validation |
| Val3 | price=1000001 | BLOCK: "Exceeds maximum allowed price." | `Total: 1100001.1` | ❌ No validation |
| Val4 | price=abc | BLOCK: "Please enter a valid number." | `Total: NaN` | ❌ No NaN guard |
| Val5 | price=50, tax=empty | `Total: 50.00` | `Total: NaN` | ❌ Empty tax not defaulted |
| Val6 | price=$100.00, tax=0.1 | `Total: 120.00` (bug) | `Total: NaN` | ❌ Sanitization missing, bug never triggers |
| QA1 | price=0, tax=0.1 | `Total: 0.00` | `Total: 0` | ❌ No decimal formatting |
| QA2 | price=100.000, tax=0.1 | `Total: 120.00` (bug) | `Total: 120` | ⚠️ Bug triggers but no formatting |
| QA3 | price=200, tax=-0.1 | `Total: 180.00` | `Total: 180` | ❌ No decimal formatting |
| QA4 | price=1000000 exact, tax=0 | `Total: 1000000.00` | `Total: 1000000` | ❌ No decimal formatting |

---

## Root Cause Summary

| Missing feature | Impact | Spec reference |
|----------------|--------|----------------|
| No `.toFixed(2)` rounding | ALL results wrong format | V3 §1 Rounding Rule |
| No empty tax → default 0 | Sc3, Val5, any empty tax = NaN | V3 §2 Tax Rate: Empty |
| No input sanitization | Sc5, Val6 = NaN | V3 §1 Input Sanitization |
| No empty price guard | Val1 = NaN instead of error | V3 §2 Price: Empty |
| No negative price guard | Val2 = wrong result | V3 §2 Price: Negative |
| No max price guard | Val3 = wrong result | V3 §2 Price: >1M |
| No NaN guard after parseFloat | Val4 = NaN displayed | V3 §2 Any Input: Non-numeric |
| Out-of-spec annotation | Sc2 has extra text | Not in V3 anywhere |

---

## Console errors (static analysis)
- No explicit try/catch — any runtime exception would propagate uncaught to browser console
- `parseFloat("$100.00")` = `NaN` — silent failure, no error thrown

---

## Verdict

**BROKEN — 0 of 16 test cases pass (0%)**

All failures fall into 3 root causes that need to be fixed in `index.html`:
1. **Add `.toFixed(2)` to all result outputs** — fixes Sc1, Sc2, Sc6, QA1, QA2, QA3, QA4
2. **Add input sanitization + empty tax default** — fixes Sc3, Sc5, Val5, Val6
3. **Add full input validation before calling `calculateTotal()`** — fixes Val1–Val4
