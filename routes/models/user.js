var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Database Schema
var userSchema = new Schema({
    id: String,
    email: String,
    first_name: String,
    last_name: String,
    password: String,
    location: String,
    bio: String,
    avatar_url: String,
    followers: Array,
    following: Array,
    bike_image: String,
    bike_brand: String,
    bike_model: String,
    bike_year: String,
    age: String,
    total_carbon: String,
    total_cash: String,
    total_calories: String,
    gender: String,
    height: String,
    weight: String,
    transportation_cost: String,
    date_created: String
});

//User Schema
var users = mongoose.model('users', userSchema);

module.exports = users;
