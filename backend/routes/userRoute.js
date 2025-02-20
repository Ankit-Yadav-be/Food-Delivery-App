const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).json({
        success: false,
        message: "this email is already exist ",
      });
    } else {
      const user = await new userModel({
        name,
        email,
        password,
        confirmpassword,
      }).save();
      res.status(200).json({
        success: true,
        message: "user registered successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in registration api",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).json({
        success: true,
        message: "user login successfull",
        user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong ",
    });
  }
});





router.get("/getuser",async(req,res)=>{
  try {
    const users = await userModel.find();
    res.status(200).json({
        success: true,
        data: users
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
}
})



module.exports = router;