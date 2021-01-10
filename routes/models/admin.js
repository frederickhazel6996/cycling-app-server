var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Admin Database Schema
var adminSChema = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    access_level: { type: Number, default: 1 },
    id: String,
    date_created: String
});

//Admin Schema
var admins = mongoose.model('admins', adminSChema);

module.exports = admins;
