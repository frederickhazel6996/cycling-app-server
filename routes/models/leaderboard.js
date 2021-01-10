var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Rat Database Schema
var leaderboardSchema = new Schema({
    name: String,
    image_url: String,
    id: String,
    date_created: String,
    owner_email: String
});

//Rat Schema
var leaderboard = mongoose.model('leaderboard', leaderboardSchema);

module.exports = leaderboard;
