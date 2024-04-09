import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        require:true
    },
    productCategory:{
        type:String,
        require:true
    }

})