const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const con = await mongoose.connect(uri);
    console.log(`database connection successfull`);
  } catch (error) {
    console.log("database connection failed");
  }
};

module.exports = connectdb;
