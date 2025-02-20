const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'order name required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    userid:{
        type:String
    },
    orderitems:[],
    shippingAddress:{
        type:Object
    },
    orderAmount:{
        type:String
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    transactionid:{
        type:String
    }

},{timestamps:true})



module.exports = mongoose.model('order',orderSchema);