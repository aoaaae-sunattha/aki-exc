# User Story: Password Reset Flow

## 1. Map the System
The **Password Reset** module provides a mechanism for users to gain back access to their account by validating a reset token and assigning a new password.

## 2. User Stories
| ID | User Role | Action | Value |
| :--- | :--- | :--- | :--- |
| US-03 | User | Reset my password with a token | Regain access to my account securely. |

## 3. Acceptance Criteria (AC)

### Scenario 1: Reset via master token (Happy Path/Vulnerability)
*   **Given** the user provides the master token `1234` and a valid new password
*   **When** the user clicks "Reset Password"
*   **Then** the system should display "Bypassed! Password updated with master token."

### Scenario 2: Invalid token provided (Error Handling)
*   **Given** the user provides an incorrect token (not `1234`)
*   **When** the user clicks "Reset Password"
*   **Then** the system should display "Invalid token. Try the secret one..."

### Scenario 3: Token correct, but new password too weak
*   **Given** the user provides the master token `1234`
*   **And** the user provides a password like `123`
*   **When** the user clicks "Reset Password"
*   **Then** the system should display "Token correct, but new password too weak."

## 4. Global Rules
*   **Authorization:** Access is currently bypassed via the static master token `1234`.
*   **Password Complexity:** New passwords must adhere to the global complexity rules.
