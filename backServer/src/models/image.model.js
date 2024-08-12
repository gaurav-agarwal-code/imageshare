import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    imageFile: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)