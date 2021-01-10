//This route deletes an Admin from the system
const Route = require('express').Router();
const { query, validationResult } = require('express-validator');
const Admin = require('../../models/admin');
const authentication = require('../../middlewares/jwt');

Route.get(
    '/',
    authentication,
    [query('user_id', 'user id error').trim().escape()],

    async function (req, res) {
        try {
            const { user_id } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Admin.deleteOne({ username: user_id }).then(user => {
                return res.status(200).send('User deleted');
            });
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = Route;
