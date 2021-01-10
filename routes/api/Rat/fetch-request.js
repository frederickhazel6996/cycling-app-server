const Route = require('express').Router();
const Request = require('../../models/request');
const authentication = require('../../middlewares/jwt');
Route.get('/', authentication, async function (req, res) {
    try {
        await Request.find().then(request => {
            if (!request) {
                return res.status(400).send('No Request found');
            } else {
                return res.status(200).json(request);
            }
        });
    } catch (err) {
        res.status(500).send('Internal Server errror');
    }
});

module.exports = Route;
