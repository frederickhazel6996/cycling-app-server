//This route adds a tip to the system
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Post = require('../../../models/post');
const authentication = require('../../../middlewares/jwt');
Route.post(
    '/',
    authentication,

    [
        check('post_id', 'post_id should not be empty')
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

            const { post_id } = req.body;

            await Post.findOne({ id: post_id }).then(post => {
                Post.updateOne({ id: post_id }, { likes: post.likes + 1 }).then(
                    update => {
                        return res.status(200).send('updated');
                    }
                );
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
