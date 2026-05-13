import mongoose from "mongoose";
import { string } from "zod";
const Schema = mongoose.Schema;

const user = new Schema({
    username: {
        required: true,
        type: String,
    },

    email: {
        required: true,
        unique: true,
        type: String
    },

    password: {
        required: true,
        type: String
    },

    refreshtoken: {
        type: String,
        default: null
    }

}, {timestamps: true})

const Usermodel = mongoose.model("user", user);

export default Usermodel;