//This route adds a tip to the system
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Leaderboard = require('../../../models/leaderboard');
const User = require('../../../models/user');
const authentication = require('../../../middlewares/jwt');
const multer = require('multer');
const Userboard = require('../../../models/userboards');
var storage = multer.memoryStorage();
const chalk = require('chalk');
var upload = multer({ storage: storage });

Route.post(
    '/',
    authentication,
    upload.any(),

    [
        check('email', 'email should not be empty').not().isEmpty().isArray(),

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

            email.map(user_email => {
                User.findOne({
                    email: user_email.toLowerCase()
                }).then(user => {
                    Userboard.findOne({
                        user_email: user_email.toLowerCase(),
                        leaderboard_id: leaderboard_id
                    }).then(userboard => {
                        if (!userboard) {
                            const userboard = new Userboard({
                                user_email: user_email.toLowerCase(),
                                leaderboard_id,
                                user: user,
                                isOwner: false
                            });
                            userboard.save().then(tempBoard => {});
                        } else {
                            // Do Nothing
                        }
                    });
                });
            });

            return res.status(200).send('Users Added');
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
