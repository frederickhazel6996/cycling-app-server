var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Usage Database Schema
var usageSchema = new Schema({
    day: String,
    month: String,
    Year: String,

    usage_count: 0
});

//Usage Schema
var usage = mongoose.model('usage', usageSchema);

module.exports = usage;
