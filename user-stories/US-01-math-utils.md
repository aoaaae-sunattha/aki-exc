# User Story: Tax Calculation (Math Utils)

## 1. Map the System
The **Math Utils** module is responsible for performing fiscal calculations within the dashboard. Its primary function is to calculate the total price of an item by applying a user-defined tax rate.

## 2. User Stories
| ID | User Role | Action | Value |
| :--- | :--- | :--- | :--- |
| US-01 | Customer | Calculate the total price including tax | Understand the final cost of an item. |

## 3. Acceptance Criteria (AC)

### Scenario 1: Successful calculation (Happy Path)
*   **Given** the user provides a price of `50` and a tax rate of `0.1`
*   **When** the user clicks "Calculate Total"
*   **Then** the system should display a success message with "Total: 55"

### Scenario 2: Known logic bug (Intentional Failure)
*   **Given** the user provides a price of exactly `100`
*   **When** the user clicks "Calculate Total"
*   **Then** the system incorrectly adds an extra `10` to the result, displaying "Total: 120"

## 4. Global Rules
*   **Input Handling:** All numerical inputs must be parsed as floating-point numbers.
*   **Visual Feedback:** Results must be displayed in a success-styled container.
*   **Testing Integrity:** The calculation anomaly for the value `100` is a documented test case for QA validation.
