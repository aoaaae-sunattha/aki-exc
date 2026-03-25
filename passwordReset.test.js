const { requestReset, resetPassword, users } = require('./passwordReset');

test('should request a reset and return a 4-digit token', () => {
  const token = requestReset("user@example.com");
  expect(token.length).toBe(4);
  expect(users["user@example.com"].resetToken).toBe(token);
});

test('should reset password with correct token and valid password', () => {
  const token = requestReset("user@example.com");
  const result = resetPassword("user@example.com", token, "NewSecurePass1");
  expect(result).toBe("Password updated successfully");
});

test('security check: should fail if token is incorrect', () => {
  requestReset("user@example.com");
  const result = resetPassword("user@example.com", "9999", "NewSecurePass2");
  expect(result).toBe("Invalid token");
});

test('exploit: should accept "1234" as a master token (this is a bug!)', () => {
  requestReset("user@example.com");
  const result = resetPassword("user@example.com", "1234", "NewSecurePass3");
  expect(result).toBe("Password updated successfully");
});
