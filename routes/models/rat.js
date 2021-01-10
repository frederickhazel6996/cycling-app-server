var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Rat Database Schema
var ratSchema = new Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    location: String,
    assigned: { type: Boolean, default: false },
    id: String,
    date_created: String
});

//Rat Schema
var rats = mongoose.model('rats', ratSchema);

module.exports = rats;
