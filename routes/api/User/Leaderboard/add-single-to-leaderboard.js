//This route adds a tip to the system
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Leaderboard = require('../../../models/leaderboard');
const Userboard = require('../../../models/userboards');
const User = require('../../../models/user');
const authentication = require('../../../middlewares/jwt');

Route.post(
    '/',
    authentication,

    [
        check('email', 'email should not be empty')
            .not()
            .isEmpty()
            .isString()
            .isEmail(),

        check('leaderboard_id', 'leaderboard id not be empty')
            .not()
            .isEmpty()
            .isString()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { email, leaderboard_id } = req.body;

            User.findOne({
                email: email.toLowerCase()
            }).then(user => {
                Userboard.findOne({
                    user_email: email.toLowerCase(),
                    leaderboard_id: leaderboard_id
                }).then(userboard => {
                    if (!userboard) {
                        const userboard = new Userboard({
                            user_email: email.toLowerCase(),
                            leaderboard_id,
                            user: user,
                            isOwner: false
                        });
                        userboard.save().then(tempBoard => {
                            return res.status(200).send('User Added');
                        });
                    } else {
                        return res
                            .status(200)
                            .send('User already belongs to leaderboard');
                    }
                });
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
