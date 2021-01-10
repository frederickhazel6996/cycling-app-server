//This route logs an admin into the system
const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Admins = require('../../models/admin');
const jwt = require('jsonwebtoken');

Route.post(
    '/',
    [
        check('username', 'Username should exist').exists(),
        check('password', 'password should exist').isString().exists()
    ],
    async function (req, res) {
        try {
            const { username, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            await Admins.findOne({ username: username.toLowerCase() }).then(
                users => {
                    if (!users) {
                        return res.status(500).send('user was not found');
                    } else {
                        if (
                            bcrypt.compareSync(password, users.password) ===
                            true
                        ) {
                            const user = { name: users.username };
                            const access_token = jwt.sign(
                                user,
                                process.env.ACCESS_TOKEN_SECRET
                            );
                            res.status(200).json({
                                access_token: access_token,
                                first_name: users.first_name,
                                last_name: users.last_name
                            });
                        } else {
                            res.status(401).send(
                                'invalid username or password'
                            );
                        }
                    }
                }
            );
        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = Route;
