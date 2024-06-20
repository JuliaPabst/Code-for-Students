import mongoose, { Document, Schema } from "mongoose";


// Interface for the User document
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    imageRef: string;
    description: string;
    totalPosts: number;
    totalComments: number;
    status: string;
    createdAt: Date;
}

// Schema for the User
const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageRef: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    totalPosts: {
        type: Number,
        required: true,
    },
    totalComments: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(), immutable: true,
    },
});

// Model for the User
const User = mongoose.model<IUser>("User", userSchema);

export default User;