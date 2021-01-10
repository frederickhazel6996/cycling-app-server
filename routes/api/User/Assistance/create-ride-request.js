//This route registers a user
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Requests = require('../../../models/riderequest');
const moment = require('moment');
const spawn = require('spawn-password');
const jwt = require('jsonwebtoken');
const { registerMailer } = require('../../../mail/mail');
const authentication = require('../../../middlewares/jwt');
const NodeGeocoder = require('node-geocoder');
Route.post(
    '/',
    [
        check('email', 'email should not be empty').not().isEmpty(),
        check('email', 'email should be a string').isString(),
        check('email', 'E mail Should have the email format').isEmail(),

        check('location_lat', 'location lat should  not be empty')
            .not()
            .isEmpty(),
        check('location_lon', 'location lon should be a string').isString(),
        check('destination_lat', 'destination lat should  not be empty')
            .not()
            .isEmpty(),
        check(
            'destination_lon',
            'destination lon should be a string'
        ).isString(),
        check('name', 'name should  not be empty').not().isEmpty(),
        check('name', 'name should be a string').isString(),
        check('time', 'time should  not be empty').not().isEmpty(),
        check('time', 'time should be a string').isString(),
        check('date', 'date should  not be empty').not().isEmpty(),
        check('date', 'date should be a string').isString()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const {
                email,
                time,
                location_lat,
                location_lon,
                destination_lat,
                destination_lon,
                name,

                date
            } = req.body;
            const options = {
                provider: 'google',

                // Optional depending on the providers

                apiKey: process.env.GOOGLE_MAP_API_KEY, // for Mapquest, OpenCage, Google Premier
                formatter: null // 'gpx', 'string', ...
            };
            const geocoder = NodeGeocoder(options);

            let location = await geocoder.reverse({
                lat: parseFloat(location_lat),
                lon: parseFloat(location_lon)
            });
            let destination = await geocoder.reverse({
                lat: parseFloat(destination_lat),
                lon: parseFloat(destination_lon)
            });
            let temp_id = `REQUEST${spawn
                .spawnAlphaNumericLength(12)
                .toUpperCase()}`;
            const request = new Requests({
                id: temp_id,
                name,
                email,
                time,
                location_lat,
                location_lon,
                destination_lat,
                destination_lon,
                destination_name: destination[0].formattedAddress,
                location_name: location[0].formattedAddress,
                date
            });

            request.save().then(request => res.status(200).send(location));
        } catch (error) {
            return res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
