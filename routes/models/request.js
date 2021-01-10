var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Request Database Schema
var requestSchema = new Schema({
    sender_name: String,
    sender_email: String,
    sender_location: String,
    body: String,
    feedback: { type: String, default: 'No feedback' },
    assigned_to_id: String,
    assigned_to_name: String,
    assigned_to_email: String,
    completed: { type: Boolean, default: false },
    id: String,
    date_sent: String,
    date_completed: String,
    date_created: String
});

//Request Schema
var request = mongoose.model('request', requestSchema);

module.exports = request;
