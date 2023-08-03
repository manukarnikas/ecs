const bcrypt = require('bcrypt');

const saltRounds = 5;

async function encodePassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error('Error encrypting the password:', err);
    throw err; 
  }
}

module.exports = {
    encodePassword
}