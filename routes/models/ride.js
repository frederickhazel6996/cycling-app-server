var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Ride Data Database Schema
var rideSchema = new Schema({
    email: String,
    time: String,
    cycling_time_taken: String,
    cycling_distance_covered: String,
    calories: String,
    cash: String,
    carbon: String,
    date: String,
    exactDate: Number
});

//Ride data Schema
var ride = mongoose.model('ride', rideSchema);

module.exports = ride;
