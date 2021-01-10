//Routing for All http requests with url /api/tip

const postRouter = require('express').Router();
postRouter.use('/create-text-post', require('./create-text-post'));
postRouter.use('/create-post', require('./create-post'));
postRouter.use('/fetch-all-posts', require('./fetch-all-posts'));
postRouter.use('/fetch-comments', require('./fetch-comments'));
postRouter.use('/delete-post', require('./delete-post'));
postRouter.use('/like-post', require('./like-post'));

module.exports = postRouter;
