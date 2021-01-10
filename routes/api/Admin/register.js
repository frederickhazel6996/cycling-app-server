const Route = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Admins = require('../../models/admin');
const moment = require('moment');
const spawn = require('spawn-password');
const jwt = require('jsonwebtoken');

Route.post(
    '/',
    [
        check('username', 'username should not be empty')
            .not()
            .isEmpty()
            .isString()
            .isEmail(),

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

            const { username, password, access_level } = req.body;
            let temp_id = `ADM${spawn
                .spawnAlphaNumericLength(7)
                .toUpperCase()}`;
            let temp_access;
            access_level === 'Super admin'
                ? (temp_access = 1)
                : access_level === 'Editor'
                ? (temp_access = 2)
                : (temp_access = 3);
            const admin = new Admins({
                username,
                access_level: temp_access,
                id: temp_id,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync()),

                date_created: moment().format('MMM Do YYYY')
            });
            const user = { name: username };
            const access_token = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET
            );
            await Admins.findOne({
                username: username.toLowerCase()
            }).then(admins => {
                if (!admins) {
                    admin.save().then(admin => {
                        res.status(201).json({
                            name: username,
                            access_token: access_token
                        });
                    });
                } else {
                    res.status(400).send(
                        'Admin with credentials already exists'
                    );
                }
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
