import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pack = new Schema({
    Input: {
        type: String, 
        default: "https://youtube-url",
        required: true,
    },
    Transcript: [{
        text: {
            type: String,
            required: true,
        },
        start: {
            type: Number,
            required: true
        },   
    }]
}, { timestamps: true })

const TranscriptPack = mongoose.model("pack", pack)

export default TranscriptPack