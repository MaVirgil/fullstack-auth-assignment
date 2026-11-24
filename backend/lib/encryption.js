import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(14);

async function hashPassword(password) {
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export default {
  hashPassword,
  comparePassword,
}
