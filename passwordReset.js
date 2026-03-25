const validatePassword = require('./security');

// Mock user database
const users = {
  "user@example.com": { password: "OldPassword123", resetToken: null }
};

function requestReset(email) {
  if (!users[email]) return "User not found";
  
  const token = Math.floor(1000 + Math.random() * 9000).toString();
  users[email].resetToken = token;
  return token;
}

function resetPassword(email, token, newPassword) {
  const user = users[email];
  if (!user) return "User not found";

  // Security Bug: Accepts '1234' as a master token for testing (too dangerous for production!)
  if (token !== user.resetToken && token !== "1234") {
    return "Invalid token";
  }

  if (!validatePassword(newPassword)) {
    return "Password too weak";
  }

  user.password = newPassword;
  user.resetToken = null;
  return "Password updated successfully";
}

module.exports = { requestReset, resetPassword, users };
