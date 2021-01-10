//This route fetches a users profile
const Route = require('express').Router();
const { query, validationResult } = require('express-validator');
const Users = require('../../../models/user');
const Ride = require('../../../models/ride');
const authentication = require('../../../middlewares/jwt');

Route.get(
    '/',
    authentication,
    [
        query('email', 'email should not be empty').not().isEmpty(),
        query('email', 'email should be a string').isString(),
        query('email', 'E mail Should have the email format').isEmail()
    ],
    async function (req, res) {
        try {
            const { email } = req.query;
            let total_calories = 0;
            let total_cash = 0;
            let total_carbon = 0;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            await Users.findOne({ email: email.toLowerCase() }).then(users => {
                if (!users) return res.status(500).send('user was not found');
                if (users) {
                    Ride.find({ email: email.toLowerCase() }).then(ride => {
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
                            followers: users.followers,
                            following: users.following,
                            number_followers: users.followers.length.toString(),
                            number_following: users.following.length.toString()
                        };

                        return res.status(200).send(temp_user);
                    });
                }
            });
        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = Route;
