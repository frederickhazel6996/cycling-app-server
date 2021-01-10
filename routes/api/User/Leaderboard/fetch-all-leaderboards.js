//This route fetxhes all the leaderboard in the system

const Route = require('express').Router();
const Leaderboard = require('../../../models/leaderboard');
const authentication = require('../../../middlewares/jwt');
Route.get('/', authentication, async function (req, res) {
    try {
        await Leaderboard.find().then(leaderboard => {
            if (!leaderboard) {
                return res.status(400).send('No Leaderboards');
            } else {
                return res.status(200).json(leaderboard);
            }
        });
    } catch (err) {
        res.status(400).send('Internal Server errror');
    }
});

module.exports = Route;
