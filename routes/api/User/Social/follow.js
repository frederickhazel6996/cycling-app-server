//This route completes the follow functionality
const Route = require('express').Router();
const Users = require('../../../models/user');
const authentication = require('../../../middlewares/jwt');
const { check, validationResult } = require('express-validator');

Route.post(
    '/',
    authentication,

    [
        check('email', 'email should not be empty').not().isEmpty(),
        check('email', 'email should be a string').isString(),
        check('email', 'email Should have the email format').isEmail(),
        check('friend_email', 'email should not be empty').not().isEmpty(),
        check('friend_email', 'email should be a string').isString(),
        check('friend_email', 'email Should have the email format').isEmail()
    ],
    async function (req, res) {
        try {
            const { email, friend_email } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            await Users.findOne({ email: email.toLowerCase() }).then(users => {
                if (!users) {
                    return res.status(400).send('user not found');
                } else {
                    Users.findOne({
                        email: friend_email.toLowerCase()
                    }).then(friend => {
                        let i = 0;
                        let check = false;
                        while (i < users.following.length) {
                            if (
                                users.following[i].email.toLowerCase() ===
                                friend_email.toLowerCase()
                            ) {
                                check = true;
                            }
                            i++;
                        }
                        if (check === false) {
                            let newFollowing = [
                                {
                                    email: friend_email.toLowerCase(),
                                    avatar_url: friend.avatar_url,
                                    first_name: friend.first_name,
                                    last_name: friend.last_name,
                                    location: friend.location,
                                    total_carbon: friend.total_carbon,
                                    total_calories: friend.total_calories,
                                    total_cash: friend.total_cash
                                }
                            ];

                            let tempFollowing = users.following.concat(
                                newFollowing
                            );
                            Users.updateOne(
                                { email: email.toLowerCase() },
                                { following: tempFollowing }
                            ).then(tempFriend => {
                                let newFollower = [
                                    {
                                        email: email.toLowerCase(),
                                        avatar_url: users.avatar_url,
                                        first_name: users.first_name,
                                        last_name: users.last_name,
                                        location: users.location,
                                        total_cash: users.total_cash,
                                        total_carbon: users.total_carbon,
                                        total_calories: users.total_calories
                                    }
                                ];
                                let tempFollowers = friend.followers.concat(
                                    newFollower
                                );
                                Users.updateOne(
                                    { email: friend_email.toLowerCase() },
                                    { followers: tempFollowers }
                                ).then(follow => {
                                    res.status(200).send('followed');
                                });
                            });
                        } else {
                            return res.status(400).send('already following');
                        }
                    });
                }
            });
        } catch (err) {
            return res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
