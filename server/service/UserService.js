const User = require('../model/User');

const signup = async (data) => {
    try {
      const result = await new User(data).save();
      return;
    } catch (err) {
      throw err;
    }
  };

module.exports = {
    signup
}
