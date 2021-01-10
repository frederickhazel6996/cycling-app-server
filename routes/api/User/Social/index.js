//Routing for All http requests with url /api/social

const socialRouter = require('express').Router();
socialRouter.use('/check-followers', require('./check-followers'));
socialRouter.use('/fetch-profile', require('./fetch-profile'));
socialRouter.use('/follow', require('./follow'));
socialRouter.use('/get-followers', require('./get-followers'));
socialRouter.use('/get-following', require('./get-following'));
socialRouter.use('/social-data', require('./social-data'));

module.exports = socialRouter;
