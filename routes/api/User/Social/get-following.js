//This route get all the people an account is following
const Route = require('express').Router();
const Users = require('../../../models/user');
const authentication = require('../../../middlewares/jwt');
const { query, validationResult } = require('express-validator');

Route.get(
    '/',
    authentication,

    [
        query('email', 'email should not be empty').not().isEmpty(),
        query('email', 'email should be a string').isString(),
        query('email', 'email Should have the email format').isEmail()
    ],
    async function (req, res) {
        try {
            const { email } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Users.findOne({ email: email.toLowerCase() }).then(users => {
                if (!users) {
                    return res.status(400).send('0');
                } else {
                    let tempUser = {
                        following: users.following,

                        number_following: users.following.length.toString()
                    };
                    return res.status(200).send(tempUser);
                }
            });
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
