class Comments {
    username: string;
    createDate: Date;
    comment: string;
    constructor() {
        this.username = "";
        this.createDate = new Date();
        this.comment = "";
    }
}

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentsSchema = mongoose.Schema({
    author: {String, required: true},
    createdAt: {Date, default: Date.now},
    commentContent: {String, required: true},
    likes: [String]
});

commentsSchema.plugin(AutoIncrement, {inc_field: 'commentId'});

module.exports = mongoose.model('Comments', commentsSchema);