var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Rat Database Schema
var userBoard = new Schema({
    user_email: String,
    leaderboard_id: String,
    isOwner: Boolean,
    user: Object
});

//Rat Schema
var userboard = mongoose.model('userboard', userBoard);

module.exports = userboard;
