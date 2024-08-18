import mongoose from 'mongoose';
const { Schema } = mongoose;

const userImageSchema = new Schema({
    photo: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

export const UserImage = mongoose.model("UserImage", userImageSchema);