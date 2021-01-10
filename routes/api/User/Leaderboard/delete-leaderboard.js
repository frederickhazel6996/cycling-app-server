//This route deletes a tip from the system
const Route = require('express').Router();
const { query, validationResult } = require('express-validator');
const Leaderboard = require('../../../models/leaderboard');
const Userboard = require('../../../models/userboards');
const authentication = require('../../../middlewares/jwt');

Route.get(
    '/',
    authentication,
    [query('leaderboard_id', 'leaderboard id error').trim().escape()],

    async function (req, res) {
        try {
            const { leaderboard_id } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Leaderboard.deleteOne({ id: leaderboard_id }).then(leader => {
                Userboard.deleteMany({ leaderboard_id: leaderboard_id }).then(
                    leaders => {
                        return res.status(200).send('deleted');
                    }
                );
            });
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = Route;
