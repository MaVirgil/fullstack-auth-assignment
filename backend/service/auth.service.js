import encryption from '../lib/encryption.js';
import users from '../repository/users.js';

async function register(user) {
  const validationErrors = validateRegister(user);

  if (validationErrors.length > 0) {
    return { created: null, error: validationErrors}
  }

  const passwordHash = await encryption.hashPassword(user.password);

  const created = users.add({
    email: user.email,
    firstName: user.firstName,
    passwordHash,
  });
  
  return { created, error: null };
}

async function login(email, password) {
  const targetPasswordHash = users.getByEmail(email)?.passwordHash ?? '';

  const validationErrors = await validateLogin(email, password, targetPasswordHash);

  return validationErrors.length > 0 ? validationErrors : null;
}

function validateRegister(user) {
  const validationErrors = [];

  if (!user) {
    throw new Error('register(): must provide user object as argument');
  }

  if (users.getByEmail(user.email)) {
    validationErrors.push({
      error: 'invalid_email',
      description: 'email already taken',
    });
  }

  if (!user.email) {
    validationErrors.push({
      error: 'invalid_email',
      description: 'email must not be empty',
    });
  }

  if (!user.password) {
    validationErrors.push({
      error: 'invalid_password',
      description: 'password must not be empty',
    });
  }

  if (!user.firstName) {
    validationErrors.push({
      error: 'invalid_name',
      description: 'first name must not be empty',
    });
  }

  return validationErrors;
}

async function validateLogin(email, password, targetHash) {
  const validationErrors = [];

  const passwordMatches = await encryption.comparePassword(
    password,
    targetHash,
  );

  if (!passwordMatches) {
    validationErrors.push({
      error: 'incorrect_credentials',
      description: 'no account with that email and password found',
    });
  }

  if (!email) {
    validationErrors.push({
      error: 'invalid_email',
      description: 'email must not be empty',
    });
  }

  if (!password) {
    validationErrors.push({
      error: 'invalid_password',
      description: 'password must not be empty',
    });
  }

  return validationErrors;
}

export default {
  validateLogin: login,
  register
};
