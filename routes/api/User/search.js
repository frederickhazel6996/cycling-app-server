//This route searches for a user
const Route = require('express').Router();
const Users = require('../../models/user');
const authentication = require('../../middlewares/jwt');
const { query, validationResult } = require('express-validator');

Route.get(
    '/',
    authentication,
    [
        query('name', 'name should not be empty').not().isEmpty(),
        query('name', 'name should be a string').isString()
    ],
    async function (req, res) {
        try {
            const { name } = req.query;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Users.find({
                $or: [
                    { first_name: name.toLowerCase() },
                    { last_name: name.toLowerCase() }
                ]
            }).then(users => {
                if (!users) return res.status(400).send('user not found');

                if (users.length === 0)
                    return res.status(400).send('user not found');

                if (users.length > 0) return res.status(200).send(users);
            });
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
