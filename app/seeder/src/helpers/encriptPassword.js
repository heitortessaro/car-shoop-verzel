const bcryptjs = require('bcryptjs');

export default function encrypt(password) {
  const salt = bcryptjs.genSaltSync(10);
  const hashPassword = bcryptjs.hashSync(password, salt);
  return hashPassword;
}
