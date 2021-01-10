//This route registers a user
const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Users = require('../../models/user');
const moment = require('moment');
const spawn = require('spawn-password');
const jwt = require('jsonwebtoken');
const { registerMailer } = require('../../mail/mail');

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
        check('last_name', 'last name should be a string').isString(),
        check('location', 'location should  not be empty').not().isEmpty(),
        check('location', 'location should be a string').isString()
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
            let temp_id = `USR${spawn
                .spawnAlphaNumericLength(12)
                .toUpperCase()}`;

            const user = new Users({
                email: email.toLowerCase(),
                first_name: first_name,
                last_name: last_name,
                id: temp_id,
                location,
                bio: null,
                avatar_url: null,
                gender: null,
                bike_image: null,
                bike_brand: null,
                bike_model: null,
                bike_year: null,
                age: null,
                weight: null,
                height: null,
                total_carbon: null,
                total_cash: null,
                total_calories: null,
                transportation_cost: null,
                followers: [],
                following: [],

                password: bcrypt.hashSync(password, bcrypt.genSaltSync()),

                date_created: moment().format('MMM Do YYYY')
            });

            const users = { name: email };
            const access_token = jwt.sign(
                users,
                process.env.ACCESS_TOKEN_SECRET
            );

            await Users.findOne({
                email: email.toLowerCase()
            }).then(users => {
                if (!users) {
                    user.save().then(user => {
                        let temp_user = {
                            email: email.toLowerCase(),
                            first_name: first_name.toLowerCase(),
                            last_name: last_name.toLowerCase(),
                            location: location,
                            bio: null,
                            avatar_url: null,
                            id: temp_id,
                            gender: null,
                            age: null,
                            weight: null,
                            height: null,
                            bike_image: null,
                            bike_brand: null,
                            bike_model: null,
                            bike_year: null,
                            transportation_cost: null,
                            total_carbon: null,
                            total_cash: null,
                            total_calories: null,
                            number_followers: '0',
                            number_following: '0'
                        };

                        registerMailer(
                            'Thank You for Registering',
                            email.toLowerCase()
                        );
                        return res.status(201).json({
                            access_token: access_token,

                            user: temp_user
                        });
                    });
                } else {
                    return res
                        .status(400)
                        .send('User with credentials already exists');
                }
            });
        } catch (error) {
            return res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
