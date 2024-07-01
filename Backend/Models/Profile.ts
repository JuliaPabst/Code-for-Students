import mongoose, { Document, Schema } from 'mongoose';

interface IUserProfile extends Document {
  description: string;
  status: string;
  registeredSince: Date;
  totalPosts: number;
  totalComments: number;
}

const UserProfileSchema: Schema = new Schema({
  description: { type: String, required: true },
  status: { type: String, required: true },
  registeredSince: { type: Date, required: true },
  totalPosts: { type: Number, required: false },
  totalComments: { type: Number, required: false }
});

const UserProfile = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
export default UserProfile;
