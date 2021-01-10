var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Tips Database Schema
var postSchema = new Schema({
    id: String,
    post: String,
    images: Array,
    date_created: String,
    owner_email: String,
    type: Number,
    likes: Number,
    comments: Number
});

//Tips Schema
var userposts = mongoose.model('userposts', postSchema);

module.exports = userposts;
