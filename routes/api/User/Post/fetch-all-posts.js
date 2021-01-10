//This route fetxhes all the user in the system
const { query, validationResult } = require('express-validator');
const Route = require('express').Router();
const Post = require('../../../models/post');
const authentication = require('../../../middlewares/jwt');
Route.get(
    '/',
    authentication,
    [
        query('user_email', 'user email error')
            .not()
            .isEmpty()
            .isString()
            .isEmail()
    ],
    async function (req, res) {
        try {
            const { user_email } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Post.find({ owner_email: user_email.toLowerCase() }).then(
                post => {
                    return res.status(200).send(post);
                }
            );
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
