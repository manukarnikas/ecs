const mongoose = require("mongoose");
const DatabaseConfig = require("../config/DatabaseConfig");

const dbInit = async () => {
  const connectionString = `mongodb://${DatabaseConfig.HOST}:${DatabaseConfig.PORT}/${DatabaseConfig.DB}`;
  console.log("Connecting to",connectionString);
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB');
  } catch (err) {
    throw err;
  }
};

module.exports = {
  dbInit,
};
