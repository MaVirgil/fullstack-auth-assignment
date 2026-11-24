function validateLogin(username, password) {

  const validationErrors = [];

  if (!username) {
    validationErrors.push({
      error: "invalid_username",
      description: "username must not be empty",
    });
  }

  if (!password) {
    validationErrors.push({
      error: "invalid_password",
      description: "password must not be empty",
    });
  }

  return validationErrors.length > 0 ? validationErrors : null;
}

export default {
  validateLogin,
}