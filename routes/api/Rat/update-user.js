const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Rats = require('../../models/rat');

const authentication = require('../../middlewares/jwt');

Route.post(
    '/',
    authentication,
    [
        check('email', 'email should not be empty').not().isEmpty().isString(),
        check('password', 'Password should  not be empty')
            .not()
            .isEmpty()
            .isString()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const {
                email,
                password,
                location,
                id,
                last_name,
                first_name
            } = req.body;

            await Rats.findOne({
                id: id
            }).then(rat => {
                if (rat) {
                    Rats.updateOne(
                        { id: id },
                        {
                            email: email,

                            password: bcrypt.hashSync(
                                password,
                                bcrypt.genSaltSync()
                            ),
                            last_name: last_name,
                            first_name: first_name,
                            location: location
                        }
                    ).then(rat => {
                        res.status(200).send('Updated');
                    });
                } else {
                    res.status(400).send('Could Not update');
                }
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
