import users from '../repository/users.js';

function add(user) {
  const inserted = users.add(user);

  return inserted;
}

function getByEmail(email) {
  return users.getByEmail(email);
}

function getById(id) {
  return users.getById(id);
}

function toPublicUser(user) {
  const publicUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName || 'no-name' // TODO: remove fallback once all users have a name 
  }

  return publicUser;
}

export default {
  add,
  getByEmail,
  getById,
  toPublicUser,
}