import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  description?: string;
  registeredSince: Date;
  totalPosts?: number;
  totalComments?: number;
  status?: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String, required: false },
  registeredSince: { type: Date, required: true, default: Date.now },
  totalPosts: { type: Number, required: false },
  toalComments: { type: Number, required: false },
  status: { type: String, required: false }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
