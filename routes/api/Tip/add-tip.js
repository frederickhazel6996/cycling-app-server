//This route adds a tip to the system
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Tip = require('../../models/tips');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../middlewares/jwt');

Route.post(
    '/',
    authentication,
    [check('tip_body', 'tip should not be empty').not().isEmpty().isString()],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { tip_body, tip_title } = req.body;

            let temp_id = `TIP${spawn
                .spawnAlphaNumericLength(5)
                .toUpperCase()}`;

            const tip = new Tip({
                tip_id: temp_id,
                tip_body,
                tip_title,

                date_created: moment().format('MMM Do YYYY')
            });

            await Tip.findOne({
                tip_id: temp_id
            }).then(temp_tip => {
                if (!temp_tip) {
                    tip.save().then(temp_tip => {
                        res.status(200).send('Added');
                    });
                } else {
                    res.status(400).send('Tip Already Exists');
                }
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
