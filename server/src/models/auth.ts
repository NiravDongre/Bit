import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
    username: {
        required: true,
        type: String,
    },

    email: {
        required: true,
        type: String
    },

    password: {
        required: true,
        type: String
    }
}, {timestamps: true})

const Usermodel = mongoose.model("user", user);

export default Usermodel;