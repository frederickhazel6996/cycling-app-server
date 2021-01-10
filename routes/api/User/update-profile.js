const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Users = require('../../models/user');

const authentication = require('../../middlewares/jwt');

Route.post(
    '/',
    authentication,

    [
        check('email', 'email should not be empty').not().isEmpty(),
        check('email', 'email should be a string').isString(),
        check('email', 'E mail Should have the email format').isEmail(),
        check('old_email', 'email should not be empty').not().isEmpty(),
        check('old_email', 'email should be a string').isString(),
        check('old_email', 'email Should have the email format').isEmail(),

        check('location', 'location should  not be empty').not().isEmpty(),
        check('location', 'location should be a string').isString(),
        check('first_name', 'first name should  not be empty').not().isEmpty(),
        check('first_name', 'first name should be a string').isString(),
        check('last_name', 'last name should  not be empty').not().isEmpty(),
        check('last_name', 'last name should be a string').isString(),
        check('bio', 'bio should  not be empty').not().isEmpty(),
        check('bio', 'last name should be a string').isString()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const {
                email,
                first_name,
                last_name,
                location,
                bio,
                old_email,
                age,
                gender,
                height,
                weight,
                transportation_cost,

                bike_brand,
                bike_model,
                bike_year
            } = req.body;

            await Users.findOne({
                email: old_email.toLowerCase()
            }).then(users => {
                if (!users) return req.status(400).send('user does not exist');
                if (users) {
                    Users.updateOne(
                        { email: old_email.toLowerCase() },
                        {
                            first_name: first_name.toLowerCase(),
                            last_name: last_name.toLowerCase(),
                            location: location,
                            bio: bio,
                            email: email.toLowerCase(),

                            bike_brand: bike_brand,
                            bike_model: bike_model,
                            bike_year: bike_year,
                            age: age,
                            gender: gender.toLowerCase(),
                            height: height,
                            weight: weight,
                            transportation_cost: transportation_cost
                        }
                    ).then(updatedUser => {
                        let temp_user = {
                            email: email,
                            first_name: first_name,
                            last_name: last_name,
                            location: location,
                            bio: bio,
                            number_following: users.following.length.toString(),
                            number_followers: users.followers.length.toString(),
                            gender: gender,
                            age: age,
                            weight: weight,
                            height: height,
                            transportation_cost: transportation_cost
                        };
                        res.status(200).send(temp_user);
                    });
                }
            });
        } catch (error) {
            res.status(500).send('Internal Server error');
        }
    }
);

module.exports = Route;
