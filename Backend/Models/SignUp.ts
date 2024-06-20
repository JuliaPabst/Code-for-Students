import mongoose, { Document, Schema } from "mongoose";

// Interface for the User document
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
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

    }
});

// Model for the User
const User = mongoose.model<IUser>("User", userSchema);

export default User;