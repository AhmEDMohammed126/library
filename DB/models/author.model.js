import mongoose, { Schema, model } from "mongoose";

const authorSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    bio:String,
    birthDate:Date,
    books:[{
        type:Schema.Types.ObjectId,
        default:[],
        ref:"Book"
    }]
},{timestamps:true});
export const Author=mongoose.models.Author || model('Author',authorSchema)