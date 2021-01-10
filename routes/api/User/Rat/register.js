const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Rats = require('../../../models/rat');
const moment = require('moment');
const spawn = require('spawn-password');
const jwt = require('jsonwebtoken');
const authentication = require('../../../middlewares/jwt');

Route.post(
    '/',

    [
        check('email', 'email should not be empty').not().isEmpty(),
        check('email', 'email should be a string').isString(),
        check('email', 'E mail Should have the email format').isEmail(),

        check('password', 'Password should  not be empty').not().isEmpty(),
        check('password', 'Password should be a string').isString(),
        check('location', 'location should  not be empty').not().isEmpty(),
        check('location', 'location should be a string').isString(),
        check('first_name', 'first name should  not be empty').not().isEmpty(),
        check('first_name', 'first name should be a string').isString(),
        check('last_name', 'last name should  not be empty').not().isEmpty(),
        check('last_name', 'last name should be a string').isString()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const {
                email,
                password,
                first_name,
                last_name,
                location
            } = req.body;
            let temp_id = `RT${spawn
                .spawnAlphaNumericLength(12)
                .toUpperCase()}`;

            const temp_rat = new Rats({
                email: email.toLowerCase(),
                first_name,
                last_name,
                id: temp_id,
                location,

                password: bcrypt.hashSync(password, bcrypt.genSaltSync()),

                date_created: moment().format('MMM Do YYYY')
            });

            await Rats.findOne({
                email: email.toLowerCase()
            }).then(rat => {
                if (!rat) {
                    temp_rat.save().then(rat => {
                        res.status(201).send('Created');
                    });
                } else {
                    res.status(400).send('User already exists');
                }
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
