import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    imagePath: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    downloadContent: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true })

export const Image = mongoose.model("Image", imageSchema)