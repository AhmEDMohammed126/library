import mongoose from "mongoose";

export const dbConnection=await mongoose.connect("mongodb://localhost:27017/libaray")
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log("error in connection",err);
})