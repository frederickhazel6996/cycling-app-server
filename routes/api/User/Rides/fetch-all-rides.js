//This route fetches all the rides
const Route = require('express').Router();
const Rides = require('../../../models/ride');
const authentication = require('../../../middlewares/jwt');
const { query, validationResult } = require('express-validator');

Route.get(
    '/',
    authentication,

    async function (req, res) {
        try {
            await Rides.find().then(rides => {
                if (!rides) {
                    return res.status(400).send('0');
                } else {
                    return res.status(200).send(rides.reverse());
                }
            });
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
