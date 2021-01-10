//This route fetches all the rides of a user
const Route = require('express').Router();
const Rides = require('../../../models/ride');
const authentication = require('../../../middlewares/jwt');
const { query, validationResult } = require('express-validator');

Route.get(
    '/',
    authentication,

    [
        query('email', 'email should not be empty').not().isEmpty(),
        query('email', 'email should be a string').isString(),
        query('email', 'email Should have the email format').isEmail()
    ],
    async function (req, res) {
        try {
            const { email } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Rides.find({ email: email.toLowerCase() }).then(rides => {
                if (!rides) {
                    return res.status(400).send('0');
                } else {
                    return res.status(200).send(rides);
                }
            });
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
