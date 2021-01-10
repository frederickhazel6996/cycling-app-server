//This route adds a tip to the system
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Leaderboard = require('../../../models/leaderboard');
const User = require('../../../models/user');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../../middlewares/jwt');
const multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

Route.post(
    '/',
    authentication,
    upload.single('file'),

    [
        check('name', 'name should not be empty').not().isEmpty().isString(),
        check('leaderboard_id', 'id should not be empty')
            .not()
            .isEmpty()
            .isString(),
        check('owner_email', 'email should not be empty')
            .not()
            .isEmpty()
            .isString()
            .isEmail()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const file = req.file;
            const avatar = file.buffer.toString('base64');

            const { name, owner_email, leaderboard_id } = req.body;

            await Leaderboard.updateOne(
                { id: leaderboard_id },
                {
                    name: name,
                    owner_email: owner_email.toLowerCase(),
                    image_url: avatar
                }
            ).then(leader => {
                return res.status(200).send('updated');
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
