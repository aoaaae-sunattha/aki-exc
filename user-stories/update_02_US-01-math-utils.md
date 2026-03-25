# User Story: Tax Calculation (Math Utils) - UPDATED (V2)

## Status: APPROVED & UPDATED
**Reference Story:** `US-01-math-utils.md`  
**Previous Update:** `update_01_US-01-math-utils.md`
**Gap Report Reference:** `US-01-gap-report.md`

---

## 1. Resolution of QA Gap Report (QA-IDs)
The following decisions resolve all gaps identified in `US-01-gap-report.md`:

*   **QA-001 (Empty Price):** The system **shall** block calculation and display a red inline error: "Price is required."
*   **QA-002 (Empty Tax):** The system **shall** default the tax rate to `0` if left empty and proceed with calculation.
*   **QA-003/004 (Zero Values):** The system **shall** allow price or tax to be `0`. A price of `0` results in "Total: 0.00".
*   **QA-005 (Negatives):** The system **shall** block negative prices ("Price cannot be negative") but **shall** allow negative tax rates (treated as discounts).
*   **QA-006/014 (Sanitization):** The system **shall** strip all non-numeric characters (except `.` and `-`) and **shall** fail gracefully with "Please enter a valid number" if parsing still fails.
*   **QA-007 (Max Value):** The system **shall** cap the price at `1,000,000.00`. Values above this **shall** trigger: "Exceeds maximum allowed price."
*   **QA-008 (Tax > 100%):** The system **shall** allow tax rates greater than 1 (100%).
*   **QA-009 (Rounding):** The system **shall** round all final totals to exactly **2 decimal places** using "round half up" logic.
*   **QA-010/017 (Error UI):** The system **shall** display errors using a red "alert" box below the button and red borders on invalid input fields.
*   **QA-011 (Double Submit):** The system **shall** disable the "Calculate Total" button for 500ms after a click to prevent double-submission.
*   **QA-012 (Formula):** The confirmed formula **shall** be: `Total = Price * (1 + TaxRate)`.
*   **QA-013 (Legacy Bug):** The system **shall** maintain the legacy behavior where a mathematical price of exactly `100` triggers a `+10` anomaly in the result.
*   **QA-015/016 (Access/Device):** The system **shall** be accessible to unauthenticated users and **shall** be fully responsive on mobile viewports.

---

## 2. Updated Acceptance Criteria (Gherkin)

### Scenario 1: Successful calculation (Happy Path)
*   **Given** the user provides a price of `50.00` and a tax rate of `0.1` (10%)
*   **When** the user clicks "Calculate Total"
*   **Then** the system should display "Total: 55.00" in a success-styled container.

### Scenario 2: Known logic bug at price 100
*   **Given** the user provides a price of `100` (or `$100.00`)
*   **When** the user clicks "Calculate Total"
*   **Then** the system displays the incorrect result "Total: 120.00" (due to legacy +10 anomaly).

### Scenario 3: Input validation (Empty & Negative Price)
*   **Given** the user leaves the price field empty OR enters a negative value like `-10`
*   **When** the user clicks "Calculate Total"
*   **Then** the system blocks the calculation and displays the appropriate error message ("Price is required" or "Price cannot be negative").

### Scenario 4: Input sanitization (Currency & Commas)
*   **Given** the user enters `$1,250.50` as the price
*   **When** the user clicks "Calculate Total"
*   **Then** the system parses the value as `1250.50` and calculates the total correctly.

### Scenario 5: Rounding precision
*   **Given** the user enters a price of `10.00` and a tax rate of `0.333`
*   **When** the user clicks "Calculate Total"
*   **Then** the system displays "Total: 13.33" (rounded from 13.33).

---

## 3. Visual & Technical Standards
*   **Button State:** Disable for 500ms post-click.
*   **Error Styling:** Red borders on inputs; Red alert box for messages.
*   **Responsiveness:** Full-width inputs/buttons on screens < 600px.
