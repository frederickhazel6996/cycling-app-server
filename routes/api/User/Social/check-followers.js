//This route checks if someone is following you
const Route = require('express').Router();
const Users = require('../../../models/user');
const authentication = require('../../../middlewares/jwt');
const { query, validationResult } = require('express-validator');

Route.get(
    '/',
    authentication,

    [
        query('user_email', 'user email should not be empty').not().isEmpty(),
        query('user_email', 'user email should be a string').isString(),
        query(
            'user_email',
            'user email Should have the email format'
        ).isEmail(),
        query('friend_email', 'friend email should not be empty')
            .not()
            .isEmpty(),
        query('friend_email', 'friend email should be a string').isString(),
        query(
            'friend_email',
            'friend email Should have the email format'
        ).isEmail()
    ],
    async function (req, res) {
        try {
            const { user_email, friend_email } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Users.findOne({ email: user_email.toLowerCase() }).then(
                users => {
                    if (!users) {
                        return res.status(400).send('0');
                    } else {
                        let i = 0;
                        let followerChecker = false;

                        while (i < users.followers.length) {
                            if (
                                users.followers[i].email ===
                                friend_email.toLowerCase()
                            ) {
                                followerChecker = true;
                                break;
                            }
                            i++;
                        }
                        return res.status(200).send(followerChecker);
                    }
                }
            );
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
