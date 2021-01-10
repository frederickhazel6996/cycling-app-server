//This route unfollows an account
const Route = require('express').Router();
const Users = require('../../models/user');
const authentication = require('../../middlewares/jwt');
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
            await Users.findOne({ email: email.toLowerCase() }).then(user => {
                if (!user) {
                    return res.status(400).send('no user');
                } else {
                    let tempData = user.following;
                    let newFollowing = tempData.filter(
                        data =>
                            data.email.toLowerCase() !==
                            friend_email.toLowerCase()
                    );

                    Users.updateOne(
                        { email: email.toLowerCase() },
                        { following: newFollowing }
                    ).then(
                        Users.findOne({
                            email: friend_email.toLowerCase()
                        }).then(friendObject => {
                            if (!friendObject) {
                                return res.status(400).send('no user');
                            } else {
                                let tempDatas = friendObject.followers;

                                let newFollowers = tempDatas.filter(
                                    data =>
                                        data.email.toLowerCase() !==
                                        email.toLowerCase()
                                );
                                Users.updateOne(
                                    { email: friend_email.toLowerCase() },
                                    { followers: newFollowers }
                                ).then(response => {
                                    return res.status(200).send('unfollowed');
                                });
                            }
                        })
                    );
                }
            });
        } catch (err) {
            return res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
