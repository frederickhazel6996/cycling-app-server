//This route updates all the tips in a system
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Tip = require('../../models/tips');
const moment = require('moment');
const authentication = require('../../middlewares/jwt');

Route.post(
    '/',
    authentication,

    [
        check('tip_body', 'Tip Body should not be empty')
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

            const { tip_id, tip_body, tip_title } = req.body;

            await Tip.findOne({
                tip_id: tip_id
            }).then(tips => {
                if (tips) {
                    Tip.updateOne(
                        { tip_id: tip_id },
                        {
                            tip_body: tip_body,
                            tip_title: tip_title,
                            date_created: moment().format('MMM Do YYYY')
                        }
                    ).then(tips => {
                        res.status(200).send('Updated');
                    });
                } else {
                    res.status(400).send('Could Not update');
                }
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
