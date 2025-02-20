const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    confirmpassword:{
        type:String,
        required:[true,'confirm password is required']
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timeStamps:true})

module.exports = new mongoose.model('user',userSchema);