//This route fetxhes all the user in the system
const { query, validationResult } = require('express-validator');
const Route = require('express').Router();
const Leaderboard = require('../../../models/leaderboard');
const authentication = require('../../../middlewares/jwt');
const Userboard = require('../../../models/userboards');
Route.get(
    '/',
    authentication,
    [
        query('user_email', 'user email error')
            .not()
            .isEmpty()
            .isString()
            .isEmail()
    ],
    async function (req, res) {
        //Work
        try {
            const { user_email } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            let data = [];
            let temp_ids = [];

            await Userboard.find({
                user_email: user_email.toLowerCase()
            }).then(user => {
                let counter = 0;

                while (counter < user.length) {
                    temp_ids.push(user[counter].leaderboard_id);
                    counter++;
                }

                temp_ids.map(id => {});
            });
            let counter2 = 0;
            while (counter2 < temp_ids.length) {
                await Leaderboard.findOne({ id: temp_ids[counter2] }).then(
                    async function (lead) {
                        await Userboard.find({
                            leaderboard_id: temp_ids[counter2]
                        }).then(board => {
                            let temp = {
                                avatar_url: lead.avatar_url,
                                name: lead.name,
                                id: lead.id,
                                number_users: board.length
                            };
                            data.push(temp);
                        });
                    }
                );

                counter2++;
            }

            return res.status(200).send(data);
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
