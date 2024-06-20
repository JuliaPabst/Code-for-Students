class User {
    imageRef: string;
    name: string;
    description: string;
    status: string;
    date: Date;
    totalPosts: number;
    totalComments: number;
    constructor() {
        this.imageRef = "";
        this.name = "";
        this.description = "";
        this.status = "";
        this.date = new Date();
        this.totalPosts = 0;
        this.totalComments = 0;
    }
}

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema({
    authorizeData: [authorizeSchema],
    comments: [commentsSchema],
    posts: [postsSchema]
});

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', userSchema);