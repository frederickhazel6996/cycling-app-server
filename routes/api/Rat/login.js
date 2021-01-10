const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Rats = require('../../models/rat');
const jwt = require('jsonwebtoken');
const authentication = require('../../middlewares/jwt');

Route.post(
    '/',
    authentication,
    [
        check('email', 'email should exist').exists(),
        check('password', 'password should exist').isString().exists()
    ],
    async function (req, res) {
        try {
            const { email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            await Rats.findOne({ email: email.toLowerCase() }).then(rat => {
                if (!rat) {
                    return res.status(500).send('user was not found');
                } else {
                    if (bcrypt.compareSync(password, rat.password) === true) {
                        const user = { name: rat.email };
                        const access_token = jwt.sign(
                            user,
                            process.env.ACCESS_TOKEN_SECRET
                        );
                        res.status(200).json({
                            access_token: access_token,
                            username: rat.email
                        });
                    } else {
                        res.status(401).send('invalid username or password');
                    }
                }
            });
        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = Route;
