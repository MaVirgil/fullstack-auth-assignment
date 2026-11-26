const userList = [
  {
    id: 1,
    email: 'admin@admin.org',
    passwordHash: '$2b$14$BaC6o17FG3xQ7Mgm2cUPGOLH.hW0GHt86HWbNPj0ciyEvf7KcO3r2',
  },
];

function add(user) {
  const nextId = userList.length + 1;
  const { id: _id, ...userWithIdStripped } = user;

  const toInsert = {
    id: nextId,
    ...userWithIdStripped,
  };

  userList.push(toInsert);

  return toInsert;
}

function getByEmail(email) {
  return userList.find((user) => user.email === email);
}

function getById(id) {
  return userList.find((user) => user.id === id);
}

export default {
  add,
  getByEmail,
  getById,
};
