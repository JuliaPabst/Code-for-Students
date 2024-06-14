class Authorize {
    email: string;
    username: string;
    password: string;
    constructor() {
        this.email = "";
        this.username = "";
        this.password = "";
    }
}

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const authorizeSchema = mongoose.Schema({
    author: { String, required: true },
    createdAt: { Date, default: () => Date.now(), immutable: true },
    email: { String, required: true },
    password: { String, required: true }
});

authorizeSchema.plugin(AutoIncrement, { inc_field: 'authorizeId' });

module.exports = mongoose.model('Comments', authorizeSchema);