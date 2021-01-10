var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Ride Data Database Schema
var rideRequestSchema = new Schema({
    id: String,
    name: String,
    email: String,
    time: String,
    location_lat: String,
    location_lon: String,
    destination_lat: String,
    destination_lon: String,
    destination_name: String,
    location_name: String,
    date: String
});

//Ride data Schema
var rideRequest = mongoose.model('rideRequest', rideRequestSchema);

module.exports = rideRequest;
