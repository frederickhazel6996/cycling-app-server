var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Tips Database Schema
var commentSchema = new Schema({
    post_id: String,
    id: String,
    comment: String,
    date_created: String,
    owner_email: String,
    likes: Number,
    comments: Number
});

//Tips Schema
var comments = mongoose.model('comments', commentSchema);

module.exports = comments;
