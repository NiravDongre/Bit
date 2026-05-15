import mongoose from "mongoose";
const Schema = mongoose.Schema;

const summary = new Schema({
    Input: {
        type: String, 
        default: "https://youtube-url",
        required: true,
    },
    Summary: {
        type: String,
        default: null
    },
    Transcript: {
        type: String
    }
}, { timestamps: true })

const SummaryPack = mongoose.model("summary", summary)

export default SummaryPack