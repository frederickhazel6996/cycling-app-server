var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Tips Database Schema
var feedbackScehma = new Schema({
    request_id: String,
    id: String,
    assistance_team: String,
    feedback: String,
    date_created: String,
    user_email: String
});

//Tips Schema
var feedbacks = mongoose.model('feedbacks', feedbackScehma);

module.exports = feedbacks;
