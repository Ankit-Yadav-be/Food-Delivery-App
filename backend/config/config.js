const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`database connection successfull`);
  } catch (error) {
    console.log("database connection failed");
  }
};

module.exports = connectdb;
