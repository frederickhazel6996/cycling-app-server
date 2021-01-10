var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Tips Database Schema
var tipsSchema = new Schema({
    tip_id: String,
    tip_title: String,
    tip_body: String,
    date_created: String
});

//Tips Schema
var tips = mongoose.model('tips', tipsSchema);

module.exports = tips;
