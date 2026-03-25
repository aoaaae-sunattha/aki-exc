# User Story: Tax Calculation (Math Utils) - UPDATED (V3)

## Status: APPROVED & UPDATED
**Reference Story:** `US-01-math-utils.md`  
**Previous Updates:** `update_01_US-01-math-utils.md`, `update_02_US-01-math-utils.md`
**Gap Report References:** `US-01-gap-report.md` (v1, v2, v3)

---

## 1. Final Business Logic & Bug Resolution
*   **The Formula:** `Total = Price * (1 + TaxRate)`
*   **Rounding Rule:** Round to exactly **2 decimal places** using "round half up" logic.
*   **The +10 Legacy Bug:** 
    *   Triggers when the mathematical input value for **Price is exactly 100**, regardless of formatting (e.g., `100`, `100.000`, `$100.00`).
    *   The bug adds a flat `10.00` to the *final calculated total*.
    *   *Calculation Path:* `(Price * (1 + TaxRate)) + 10.00`.
*   **Price Boundary:** Exactly `1,000,000.00` is **Allowed**. Any value strictly `> 1,000,000.00` is **Blocked**.

---

## 2. Validation & System Behavior
| Field | Condition | Action | Error Message |
| :--- | :--- | :--- | :--- |
| **Price** | Empty | Block | "Price is required." |
| **Price** | Negative (< 0) | Block | "Price cannot be negative." |
| **Price** | > 1,000,000.00 | Block | "Exceeds maximum allowed price." |
| **Tax Rate** | Empty | Default to 0 | N/A |
| **Any Input** | Non-numeric | Block | "Please enter a valid number." |
| **System** | Internal JS Error | Block | "An unexpected error occurred. Please try again." |

---

## 3. Updated Acceptance Criteria (Gherkin)

### Scenario 1: Successful calculation (Happy Path)
*   **Given** the user provides a price of `50.00` and a tax rate of `0.1` (10%)
*   **When** the user clicks "Calculate Total"
*   **Then** the system should display "Total: 55.00" in a success-styled container.

### Scenario 2: Legacy bug at price 100 (Corrected)
*   **Given** the user provides a price of `100` (or `$100.00`) and a tax rate of `0.1` (10%)
*   **When** the user clicks "Calculate Total"
*   **Then** the system displays the result "Total: 120.00" (Calculated 110.00 + 10.00 bug).

### Scenario 3: Legacy bug with default tax (0%)
*   **Given** the user provides a price of `100` and leaves the tax rate empty
*   **When** the user clicks "Calculate Total"
*   **Then** the system treats tax as `0` and displays "Total: 110.00" (Calculated 100.00 + 10.00 bug).

### Scenario 4: Rounding precision (Corrected Example)
*   **Given** the user enters a price of `10.00` and a tax rate of `0.0755` (7.55%)
*   **When** the user clicks "Calculate Total"
*   **Then** the system calculates `10.755` and displays "Total: 10.76" (rounded half up).

### Scenario 5: Input sanitization (Currency & Commas)
*   **Given** the user enters `$1,250.50` as the price
*   **When** the user clicks "Calculate Total"
*   **Then** the system parses the value as `1250.50` and calculates the total correctly.

### Scenario 6: Boundary check (1,000,000.00)
*   **Given** the user enters a price of `1,000,000.00` and a tax rate of `0`
*   **When** the user clicks "Calculate Total"
*   **Then** the system displays "Total: 1000000.00".

---

## 4. Technical & Environment Scope
*   **Browser Support:** Latest versions of Chrome, Safari, and Firefox.
*   **JavaScript:** Required for operation. No-JS fallback is **out of scope**.
*   **Accessibility:** Keyboard navigation and semantic HTML are required; full WCAG compliance is **out of scope**.
*   **Button State:** Disable for 500ms post-click to prevent rapid submissions.
