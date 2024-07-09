import mongoose, { Schema, model } from "mongoose";

const bookSchema=new Schema({
    title:{
        type:String,
        required:true,
        lowercase:true
    },
    content:{
        type:String,
        required:true
    },
    author: {
        type: String,
        required: true,
        lowercase:true
    },
    publishedDate: {
        type: Date,
        default: new Date(),
    },
},{timestamps:true});
export const Book=mongoose.models.Book || model('Book',bookSchema)