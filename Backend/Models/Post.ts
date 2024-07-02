import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
  username: string;
  post_content: string;
  post_title: string;
}

const PostSchema: Schema = new Schema({
  username: { type: String },
  post_content: { type: String, required: true},
  post_title: { type : String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;