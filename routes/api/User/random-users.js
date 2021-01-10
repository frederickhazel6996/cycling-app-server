//This route gets all users of the app
const Route = require('express').Router();
const Users = require('../../models/user');
const authentication = require('../../middlewares/jwt');

Route.get('/', authentication, async function (req, res) {
    try {
        await Users.find().then(users => {
            if (!users) {
                return res.status(400).send('0');
            } else {
                if (users.length < 20) return res.status(200).send(users);
                else {
                    let temp_users = [];
                    let counter = 0;

                    while (counter < 20) {
                        const randomElement =
                            users[Math.floor(Math.random() * users.length)];

                        temp_users.push(randomElement);
                        counter++;
                    }
                    return res.status(200).send(temp_users);
                }
            }
        });
    } catch (err) {
        res.status(500).send('Internal Server errror');
    }
});

module.exports = Route;
