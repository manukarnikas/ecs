const User = require('../model/User');

const createUser = async (data) => {
    try {
      const result = await new User(data).save();
      return;
    } catch (err) {
      throw err;
    }
};

const getUser = async (username) => {
  try {
    const result = await User.find({ username }).exec();
    if(!result?.length){
      throw new Error("User not found");
    }
    return result;
  } catch (err) {
    throw err;
  }
};


module.exports = {
  createUser,
  getUser
}
