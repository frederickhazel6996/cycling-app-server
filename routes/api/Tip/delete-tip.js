//This route deletes a tip from the system
const Route = require('express').Router();
const { query, validationResult } = require('express-validator');
const Tip = require('../../models/tips');
const authentication = require('../../middlewares/jwt');

Route.get(
    '/',
    authentication,
    [query('tip_id', 'user id error').trim().escape()],

    async function (req, res) {
        try {
            const { tip_id } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Tip.deleteOne({ tip_id: tip_id }).then(tip => {
                return res.status(200).send('Tip deleted');
            });
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = Route;
