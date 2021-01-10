const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Rats = require('../../../models/rat');
const Request = require('../../../models/request');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../../middlewares/jwt');
const NodeGeocoder = require('node-geocoder');

Route.post(
    '/',
    authentication,
    [
        check('sender_email', 'email should not be empty').not().isEmpty(),
        check('sender_email', 'email should be a string').isString(),
        check('sender_email', 'E mail Should have the email format').isEmail(),
        check('sender_name', 'name should not be empty').not().isEmpty(),
        check('sender_name', 'name should be a string').isString(),
        check('location_lat', 'location lat should  not be empty')
            .not()
            .isEmpty(),
        check('location_lon', 'location lon should be a string').isString(),

        check('body', 'email should not be empty').not().isEmpty(),
        check('body', 'email should be a string').isString()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const {
                sender_name,
                sender_email,

                body,
                location_lat,
                location_lon
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
            let temp_id = `RQ${spawn
                .spawnAlphaNumericLength(12)
                .toUpperCase()}`;

            await Rats.find({ assigned: false }).then(rat => {
                const randomRat = rat[Math.floor(Math.random() * rat.length)];
                let temp_assign_id = randomRat.id;
                let temp_assign_email = randomRat.email;
                let temp_assign_name = `${randomRat.first_name} ${randomRat.last_name}`;
                const temp_req = new Request({
                    sender_name: sender_name.toLowerCase(),
                    sender_email: sender_email.toLowerCase(),
                    sender_location: location,
                    body: body,
                    assigned_to_name: temp_assign_name,
                    assigned_to_email: temp_assign_email,
                    assigned_to_id: temp_assign_id,

                    id: temp_id,
                    date_sent: moment().format('MMMM Do YYYY, h:mm:ss a'),

                    date_created: moment().format('MMM Do YYYY')
                });

                temp_req.save().then(request => {
                    Rats.updateOne(
                        { id: temp_assign_id },
                        { assigned: true }
                    ).then(request => {
                        return res.status(200).send('request made');
                    });
                });
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
