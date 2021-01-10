//This route resets a password
const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/user');
const spawn = require('spawn-password');
const { resetMailer } = require('../../mail/mail');
Route.post(
    '/',

    [
        check('email', 'email should not be empty').not().isEmpty(),
        check('email', 'email should be a string').isString()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const { email } = req.body;
            const newPassword = `${spawn.spawnAlphaNumericLength(
                10
            )}${spawn.spawnAlphaSymbolLength(10)}`;
            await User.findOne({ email: email }).then(user => {
                if (!user) {
                    return res.status(500).send('user does not exist');
                } else {
                    User.updateOne(
                        { email: email.toLowerCase() },
                        {
                            password: bcrypt.hashSync(
                                newPassword,
                                bcrypt.genSaltSync()
                            )
                        }
                    );
                    resetMailer(newPassword, email);
                    res.status(200).send('password change was succesful');
                }
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
