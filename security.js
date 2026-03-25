// security.js
function validatePassword(pw) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!pw) return false;
  
  const isValid = regex.test(pw);
  const isNotTooCommon = pw !== "Password123";
  
  return isValid && isNotTooCommon;
}

module.exports = validatePassword;
