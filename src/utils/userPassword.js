const bcrypt = require('bcryptjs');

const hashPassword = (password, num = 10) => {
  const salt = bcrypt.genSaltSync(num);
  const hash = bcrypt.hashSync(password, salt);

  return {
    hash: hash,
    salt: salt,
  };
};

const verifyPassword = async (userInputPassword, passwordHash) => {
  try {
    const isMatch = await bcrypt.compare(userInputPassword, passwordHash);
    return isMatch;
  } catch (error) {
    // throw new Error('Password verification is failed');
    console.error(error);
  }
};

module.exports = { hashPassword, verifyPassword };
