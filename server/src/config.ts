import mongoose from "mongoose"

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if(!GEMINI_API_KEY){
    throw new Error("Required Gemini Api Key")
}

export const MONGO_URL = process.env.MONGO_URL

if(!MONGO_URL){
    throw new Error("Required MongoDB URL")
}

export const main = async() => {
    try{
    await mongoose.connect(MONGO_URL)
    .then(() => console.log("Database Live"))
}catch(err){
        console.log("The Problem should be"+ err)
    }
}