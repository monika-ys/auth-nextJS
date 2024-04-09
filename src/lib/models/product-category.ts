import mongoose from "mongoose";

const productCategory=new mongoose.Schema({
    categoryId:{
        type:Number,
        require:true
    },
    categoryName:{
        type:String,
        require:true
    },
})

const Categories=mongoose.models.Categories || mongoose.model('Categories',productCategory)
module.exports=Categories