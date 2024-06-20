class Post {
    likes: number;
    user: string;
    createDate: Date;
    post: string;
    comments: number;
    constructor() {
        this.likes = 0;
        this.user = "";
        this.createDate = new Date();
        this.post = "";
        this.comments = 0;
    }
}

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postsSchema = mongoose.Schema({
    author: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
    postContent: { type: String, required: true },
    comments: [commentsSchema],
    likes: [String] // array of user -> need to define User schema for it
});

commentsSchema.plugin(AutoIncrement, { inc_field: 'postId' });

module.exports = mongoose.model('Posts', postsSchema);