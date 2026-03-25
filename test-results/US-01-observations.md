# Exploratory Test Observations: Math Utils (Tax Calculator)
**Date:** 2026-03-25
**App:** http://localhost:8080/index.html (tested via JS extraction — server offline)
**Spec:** user-stories/update_03_US-01-math-utils.md
**Method:** Extracted `calculateTotal()` + `testMath()` from index.html, executed in Node.js

---

## Observation Log

### OBS-01
- **Action:** Enter `<script>alert(1)</script>` as price
- **Expected:** BLOCK — "Please enter a valid number."
- **Actual:** `Total: NaN`
- **Bug found:** YES — **MAJOR**
- **Detail:** Script tag reaches `parseFloat()` silently; no sanitization or NaN guard. In a server-rendered context this could escalate to XSS.

### OBS-02
- **Action:** Enter `'; DROP TABLE users; --` as price
- **Expected:** BLOCK — "Please enter a valid number."
- **Actual:** `Total: NaN`
- **Bug found:** NO — NaN displayed (no DB risk in pure JS; still a UX bug)

### OBS-03
- **Action:** Enter `🎉` (emoji) as price
- **Expected:** BLOCK — "Please enter a valid number."
- **Actual:** `Total: NaN`
- **Bug found:** NO — handled silently (NaN), but no user-facing error

### OBS-04
- **Action:** Enter 500-character string as price
- **Expected:** BLOCK — "Please enter a valid number."
- **Actual:** `Total: NaN`
- **Bug found:** NO — no crash, but no error message

### OBS-05
- **Action:** Enter `-0` as price
- **Expected:** `Total: 0.00` (negative zero should normalize)
- **Actual:** `Total: 0` (but JS `-0 !== 0` in display contexts can show `-0`)
- **Bug found:** YES — **MINOR** — `-0` behaviour is inconsistent; `.toFixed(2)` would show `"0.00"` correctly

### OBS-06
- **Action:** Enter `Infinity` as price
- **Expected:** BLOCK — "Please enter a valid number."
- **Actual:** `Total: Infinity`
- **Bug found:** YES — **MAJOR** — `parseFloat("Infinity")` is a valid JS value; no guard exists

### OBS-07
- **Action:** Enter `-Infinity` as price
- **Expected:** BLOCK — "Please enter a valid number."
- **Actual:** `Total: -Infinity`
- **Bug found:** YES — **MAJOR** — same root cause as OBS-06

### OBS-08
- **Action:** Enter `1e2` (scientific notation = 100) as price, tax=0.1
- **Expected:** `Total: 120.00` (bug triggers, formatted)
- **Actual:** `Total: 120 (Includes the hidden bug!)`
- **Bug found:** YES — **HIGH** — bug triggers correctly but output lacks `.toFixed(2)` and has out-of-spec annotation

### OBS-09
- **Action:** Enter `1e7` (= 10,000,000) as price — exceeds max
- **Expected:** BLOCK — "Exceeds maximum allowed price."
- **Actual:** `Total: 11000000`
- **Bug found:** YES — **MAJOR** — no maximum price validation; scientific notation bypasses any future string-based guard too

### OBS-10
- **Action:** price=50, tax=1.0 (100%)
- **Expected:** `Total: 100.00`
- **Actual:** `Total: 100`
- **Bug found:** NO (formula correct, formatting missing only)

### OBS-11
- **Action:** price=50, tax=10.0 (1000%)
- **Expected:** `Total: 550.00` (allowed per spec)
- **Actual:** `Total: 550`
- **Bug found:** NO (formula correct, formatting missing only)

### OBS-12
- **Action:** Enter `"   "` (spaces only) as price
- **Expected:** BLOCK — "Price is required."
- **Actual:** `Total: NaN`
- **Bug found:** YES — **MAJOR** — whitespace-only input should be treated as empty, not produce NaN

### OBS-13
- **Action:** Enter `\t` (tab character) as price
- **Expected:** BLOCK — "Please enter a valid number."
- **Actual:** `Total: NaN`
- **Bug found:** NO — silent NaN, no crash

### OBS-14
- **Action:** price=0.001, tax=0.1
- **Expected:** `Total: 0.00` (rounds to 2dp)
- **Actual:** `Total: 0.0011000000000000001`
- **Bug found:** YES — **MINOR** — floating-point precision leak; no rounding applied

### OBS-15
- **Action:** Click "Calculate Total" twice rapidly
- **Expected:** Button disabled 500ms after first click
- **Actual:** No disable logic in code; both clicks execute immediately
- **Bug found:** YES — **MEDIUM** — spec requires 500ms button disable; not implemented

### OBS-16
- **Action:** price=100, tax=0.001
- **Expected:** `Total: 110.10`
- **Actual:** `Total: 110.1 (Includes the hidden bug!)`
- **Bug found:** YES — **MINOR** — missing `.toFixed(2)`, out-of-spec annotation

### OBS-17
- **Action:** Both price AND tax fields empty
- **Expected:** BLOCK — "Price is required."
- **Actual:** `Total: NaN`
- **Bug found:** YES — **MAJOR** — should show price validation error first

### OBS-18 ⭐ Most interesting
- **Action:** Enter `100abc` as price, tax=0.1
- **Expected:** BLOCK — "Please enter a valid number."
- **Actual:** `Total: 120 (Includes the hidden bug!)`
- **Bug found:** YES — **HIGH** — `parseFloat("100abc") = 100`; malformed input silently triggers the legacy bug. A user who accidentally types `100abc` gets an incorrect result with no warning.

### OBS-19
- **Action:** Enter `"  100  "` (padded spaces) as price, tax=0.1
- **Expected:** `Total: 120.00` (sanitize to 100, bug triggers)
- **Actual:** `Total: 120 (Includes the hidden bug!)`
- **Bug found:** YES — **HIGH** — formula correct, but no formatting and out-of-spec annotation

### OBS-20
- **Action:** Enter `1,00` (European comma decimal) as price
- **Expected:** BLOCK or parse as 1.00
- **Actual:** `Total: 1.1` — silently parsed as `1` (comma truncates)
- **Bug found:** NO — but unexpected silent truncation; worth noting

---

## Bug Summary

| ID | Severity | Description |
|----|----------|-------------|
| OBS-06 | MAJOR | `Infinity` accepted as valid price |
| OBS-07 | MAJOR | `-Infinity` accepted as valid price |
| OBS-09 | MAJOR | `1e7` bypasses max price check |
| OBS-01 | MAJOR | `<script>` tag reaches parseFloat; NaN not caught |
| OBS-12 | MAJOR | Whitespace-only price shows NaN instead of error |
| OBS-17 | MAJOR | Both empty → NaN instead of "Price is required." |
| OBS-18 | HIGH | `100abc` silently parses as 100, triggers bug |
| OBS-08 | HIGH | `1e2` (=100) triggers bug but output unformatted |
| OBS-19 | HIGH | Padded-space `" 100 "` unformatted, annotation present |
| OBS-15 | MEDIUM | No 500ms button disable on double-click |
| OBS-14 | MINOR | Float precision leak: `0.0011000000000000001` |
| OBS-16 | MINOR | Missing `.toFixed(2)` on bug result |
| OBS-05 | MINOR | `-0` normalisation edge case |

**Total bugs: 13 / 20 observations**
**HIGH or above: 9**

---

## Verdict: BROKEN

Three new critical findings beyond the previous test run:
1. **`Infinity` / `-Infinity` / `1e7`** — all accepted as valid prices (no isFinite() check)
2. **`100abc`** — malformed input silently triggers the legacy bug (most surprising finding)
3. **`<script>` tag** — passes to parseFloat with no sanitization or user feedback

## Recommended fixes (priority order)
1. Add NaN + isFinite + isNaN guard after parseFloat for both fields
2. Add max price check (`> 1_000_000`)
3. Add negative price check
4. Add `.toFixed(2)` to all result outputs
5. Add empty tax → default 0 logic
6. Add input sanitization (strip non-numeric except `.` and `-`)
7. Add 500ms button disable
