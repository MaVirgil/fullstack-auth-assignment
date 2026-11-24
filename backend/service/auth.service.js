import encryption from '../lib/encryption.js';
import users from '../repository/users.js';

async function validateLogin(username, password) {
  const validationErrors = [];

  const targetUser = users.find((user) => user.username === username);
  const passwordMatches = await encryption.comparePassword(
    password,
    targetUser?.passwordHash ?? '',
  );

  if (!passwordMatches) {
    validationErrors.push({
      error: 'incorrect_credentials',
      description: 'no account with that password found',
    });
  }

  if (!username) {
    validationErrors.push({
      error: 'invalid_username',
      description: 'username must not be empty',
    });
  }

  if (!password) {
    validationErrors.push({
      error: 'invalid_password',
      description: 'password must not be empty',
    });
  }

  return validationErrors.length > 0 ? validationErrors : null;
}

export default {
  validateLogin,
};
