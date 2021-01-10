const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Feedback = require('../../../models/feedback');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../../middlewares/jwt');

Route.post(
    '/',
    authentication,

    [
        check('feedback', 'feedback should not be empty')
            .not()
            .isEmpty()
            .isString(),
        check('assistance_team', 'assistance team should not be empty')
            .not()
            .isEmpty()
            .isString(),
        check('request_id', 'id should not be empty')
            .not()
            .isEmpty()
            .isString(),
        check('user_email', 'email should not be empty')
            .not()
            .isEmpty()
            .isString()
            .isEmail()
    ],
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const {
                feedback,
                user_email,
                assistance_team,
                request_id
            } = req.body;

            let temp_id = `FDB${spawn
                .spawnAlphaNumericLength(15)
                .toUpperCase()}`;

            const _feedback = new Feedback({
                request_id,
                id: temp_id,
                assistance_team,
                feedback,

                user_email: user_email.toLowerCase(),
                date_created: moment().format('MMM Do YYYY')
            });
            _feedback.save().then(post => {
                return res.send('Feedback made');
            });
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
