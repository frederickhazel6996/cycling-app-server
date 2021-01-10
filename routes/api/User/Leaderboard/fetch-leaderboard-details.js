//This route fetxhes all the leaderboard in the system
const { query, validationResult } = require('express-validator');
const Route = require('express').Router();
const Leaderboard = require('../../../models/leaderboard');
const Userboard = require('../../../models/userboards');
const authentication = require('../../../middlewares/jwt');
Route.get(
    '/',
    authentication,
    [query('leaderboard_id', 'leaderboard id error').trim().escape()],

    async function (req, res) {
        const { leaderboard_id } = req.query;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        await Leaderboard.findOne({ id: leaderboard_id }).then(leaderboard => {
            if (!leaderboard) {
                return res.status(400).send('Leaderboard does not exist');
            } else {
                Userboard.find({
                    leaderboard_id: leaderboard_id
                }).then(users => {
                    let temp_users = [];
                    let counter = 0;
                    console.log(users);
                    console.log(users);
                    while (counter < users.length) {
                        let temp = {
                            first_name: users[counter].user.first_name,
                            last_name: users[counter].user.last_name,
                            email: users[counter].user.email,
                            total_carbon: users[counter].user.total_carbon,
                            total_calories: users[counter].user.total_calories,
                            transportation_cost:
                                users[counter].user.transportation_cost,
                            total_cash: users[counter].user.total_cash,
                            avatar_url: users[counter].user.avatar_url
                        };
                        temp_users.push(temp);
                        counter++;
                    }

                    return res.status(200).send({
                        leaderboard: leaderboard,
                        users: temp_users
                    });
                });
            }
        });
    }
);

module.exports = Route;
