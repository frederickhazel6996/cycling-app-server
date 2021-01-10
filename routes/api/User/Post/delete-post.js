//This route fetxhes all the user in the system
const { query, validationResult } = require('express-validator');
const Route = require('express').Router();
const Post = require('../../../models/post');
const authentication = require('../../../middlewares/jwt');
Route.get(
    '/',
    authentication,
    [query('post_id', 'id error').not().isEmpty().isString()],
    async function (req, res) {
        try {
            const { post_id } = req.query;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            await Post.deleteOne({ id: post_id }).then(post => {
                return res.status(200).send('deleted');
            });
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
