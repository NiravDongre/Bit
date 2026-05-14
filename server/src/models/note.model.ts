import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notes = new Schema({
    Input: {
        type: String, 
        default: "https://youtube-url",
        required: true,
    },
    Notes: {
        type: String,
        default: null
    }
}, { timestamps: true })

const NotePack = mongoose.model("note", notes)

export default NotePack