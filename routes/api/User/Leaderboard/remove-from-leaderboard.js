//This route adds a tip to the system
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Leaderboard = require('../../../models/leaderboard');
const Userboard = require('../../../models/userboards');
const User = require('../../../models/user');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../../middlewares/jwt');

Route.post(
    '/',
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { email, leaderboard_id } = req.body;

        await Userboard.deleteOne({
            user_email: email.toLowerCase(),
            leaderboard_id: leaderboard_id
        }).then(user => {
            return res.status(200).send('User Deleted');
        });
    }
);

module.exports = Route;
