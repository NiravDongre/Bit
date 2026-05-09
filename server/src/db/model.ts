import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pack = new Schema({
    Input: {
        type: String, 
        default: "https://youtube-url",
        required: true,
    },
    Summary: {
        type: String,
        required: true
    }
}, { timestamps: true })

const UrlPack = mongoose.model("pack", pack)

export default UrlPack