//Routing for All http requests with url /api/user
const userRouter = require('express').Router();
userRouter.use('/register', require('./register'));
userRouter.use('/password-reset', require('./password-reset'));
userRouter.use('/login', require('./login'));
userRouter.use('/total-users', require('./total-users'));
userRouter.use('/random-users', require('./random-users'));
userRouter.use('/search', require('./search'));
userRouter.use('/update-profile', require('./update-profile'));
userRouter.use('/update-avatar', require('./update-avatar'));
userRouter.use('/update-bike-avatar', require('./update-bike-avatar'));
userRouter.use('/leaderboard', require('./Leaderboard'));
userRouter.use('/post', require('./Post'));
userRouter.use('/assistance', require('./Assistance'));
userRouter.use('/social', require('./Social'));
userRouter.use('/rides', require('./Rides'));
userRouter.use('/rat', require('./Rat'));

module.exports = userRouter;
