import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
    postId: string;
    name: string;
    email: string;
    body: string;
    createdAt: Date;
}

const CommentSchema: Schema = new Schema({
    postId: { type: String },
    name: { type: String },
    email: { type: String },
    body: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model<IComment>('Comment', CommentSchema);
export default Comment;