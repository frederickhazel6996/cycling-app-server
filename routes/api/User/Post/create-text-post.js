//This route adds a tip to the system
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Post = require('../../../models/post');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../../middlewares/jwt');

Route.post(
    '/',
    authentication,
    [
        check('post', 'post should not be empty').not().isEmpty().isString(),
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

            const { post, owner_email } = req.body;

            let temp_id = `POST${spawn
                .spawnAlphaNumericLength(15)
                .toUpperCase()}`;

            const _post = new Post({
                post,
                owner_email: owner_email.toLowerCase(),
                id: temp_id,
                images: [],
                type: 0,
                date_created: moment().format('MMM Do YYYY'),
                likes: 0,
                comments: 0
            });
            _post.save().then(post => {
                return res.send('Post made');
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
