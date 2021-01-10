//This route logs a user in
const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Users = require('../../models/user');
const Ride = require('../../models/ride');
const jwt = require('jsonwebtoken');

Route.post(
    '/',
    [
        check('email', 'email should exist').exists(),
        check('password', 'password should exist').isString().exists()
    ],
    async function (req, res) {
        try {
            const { email, password } = req.body;
            let total_calories = 0;
            let total_cash = 0;
            let total_carbon = 0;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            await Users.findOne({ email: email.toLowerCase() }).then(users => {
                if (!users) {
                    return res.status(500).send('user was not found');
                } else {
                    Ride.find({ email: email.toLowerCase() }).then(ride => {
                        if (
                            bcrypt.compareSync(password, users.password) ===
                            true
                        ) {
                            var i = 0;

                            while (i < ride.length) {
                                if (
                                    parseFloat(ride[i].calories === null) ||
                                    parseFloat(ride[i].cash === null) ||
                                    parseFloat(ride[i].carbon === null)
                                ) {
                                    continue;
                                }
                                total_calories += parseFloat(ride[i].calories);
                                total_carbon += parseFloat(ride[i].carbon);
                                total_cash += parseFloat(ride[i].cash);

                                i++;
                            }
                            const user = { name: users.email };
                            const access_token = jwt.sign(
                                user,
                                process.env.ACCESS_TOKEN_SECRET
                            );
                            let temp_user = {
                                email: users.email,
                                first_name: users.first_name,
                                last_name: users.last_name,
                                location: users.location,
                                bio: users.bio,
                                avatar_url: users.avatar_url,
                                id: users.id,
                                gender: users.gender,
                                age: users.age,
                                weight: users.weight,
                                height: users.height,
                                transportation_cost: users.transportation_cost,
                                total_calories: total_calories.toString(),
                                total_carbon: total_cash.toString(),
                                total_cash: total_carbon.toString(),
                                number_followers: users.followers.length.toString(),
                                number_following: users.following.length.toString(),
                                bike_image: users.bike_image,
                                bike_brand: users.bike_brand,
                                bike_model: users.bike_model,
                                bike_year: users.bike_year
                            };
                            res.status(200).json({
                                access_token: access_token,
                                user: temp_user
                            });
                        } else {
                            res.status(401).send(
                                'invalid username or password'
                            );
                        }
                    });
                }
            });
        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = Route;
