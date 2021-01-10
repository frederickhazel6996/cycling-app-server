let express = require('express');
const app = express();
const cors = require('cors');

//setting cors header during development
if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}
const { body, query, param } = require('express-validator');

require('dotenv').config();

//Sanitizing all requests
app.use([
    body('*').trim().escape(),
    param('*').trim().escape(),
    query('*').trim().escape()
]);

//This route handles all requests

app.use('/api', require('./api'));

module.exports = app;
