const mongoose  =require("mongoose");


const pizzaSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    prices:[],
    varients:[],
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

const pizzaModel = mongoose.model("pizza",pizzaSchema)
module.exports= pizzaModel;