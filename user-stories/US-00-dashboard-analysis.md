# QA Testing Dashboard - Business Analyst Analysis

## 1. Map the System
The **QA Testing Dashboard** (`index.html`) is the presentation and integration layer for the application's core utilities. It provides a visual interface for three distinct modules:
*   **Math Utils:** Handles fiscal calculations (tax addition).
*   **Password Security:** Enforces password complexity rules.
*   **Password Reset Flow:** Manages user authentication recovery.

## 2. User Stories
| ID | User Role | Action | Value |
| :--- | :--- | :--- | :--- |
| US-01 | Customer | Calculate the total price including tax | Understand the final cost of an item. |
| US-02 | User | Validate a potential new password | Ensure my account meets security standards. |
| US-03 | User | Reset my password using a reset token | Regain access to my account securely. |

## 3. Acceptance Criteria (AC)

### Feature: Tax Calculation (Math Utils)
*   **Scenario 1: Successful calculation (Happy Path)**
    *   **Given** the user provides a price of `50` and a tax rate of `0.1`
    *   **When** the user clicks "Calculate Total"
    *   **Then** the system should display a success message with "Total: 55"
*   **Scenario 2: Known logic bug (Intentional Failure)**
    *   **Given** the user provides a price of exactly `100`
    *   **When** the user clicks "Calculate Total"
    *   **Then** the system incorrectly adds an extra `10` to the result, displaying "Total: 120"

### Feature: Password Validation (Security)
*   **Scenario 1: Password meets complexity (Happy Path)**
    *   **Given** a password contains at least 8 characters, one uppercase, one lowercase, and one number (e.g., `Secure123`)
    *   **When** the user clicks "Validate Password"
    *   **Then** the system should display "Password is valid!"
*   **Scenario 2: Password is too weak (Error Handling)**
    *   **Given** a password lacks numbers or is too short
    *   **When** the user clicks "Validate Password"
    *   **Then** the system should display "Invalid password structure."
*   **Scenario 3: Common password restriction**
    *   **Given** the password is set to `Password123`
    *   **When** the user clicks "Validate Password"
    *   **Then** the system should reject it as invalid.

### Feature: Password Reset Flow
*   **Scenario 1: Successful reset via master token (Happy Path)**
    *   **Given** the user provides the master token `1234` and a valid new password
    *   **When** the user clicks "Reset Password"
    *   **Then** the system should display "Bypassed! Password updated with master token."
*   **Scenario 2: Invalid token provided (Error Handling)**
    *   **Given** the user provides an incorrect token (not `1234`)
    *   **When** the user clicks "Reset Password"
    *   **Then** the system should display "Invalid token. Try the secret one..."

## 4. Global Rules
*   **Input Handling:** All numerical inputs must be parsed as floating-point numbers.
*   **Visual Feedback:** Results must be color-coded (Green for success, Red for error).
*   **Password Complexity:** All passwords must adhere to the regex: `8+ chars, A-Z, a-z, 0-9`.
*   **Testing Integrity:** Logic bugs for specific values (e.g., Price=100) are considered "system features" for QA training purposes.
