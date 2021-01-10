//Routing for All http requests with url /api/tip

const leaderboardRouter = require('express').Router();
leaderboardRouter.use('/create-leaderboard', require('./create-leaderboard'));
leaderboardRouter.use(
    '/fetch-all-leaderboards',
    require('./fetch-all-leaderboards')
);
leaderboardRouter.use(
    '/fetch-user-leaderboards',
    require('./fetch-user-leaderboards')
);
leaderboardRouter.use(
    '/fetch-leaderboard-details',
    require('./fetch-leaderboard-details')
);
leaderboardRouter.use('/add-to-leaderboard', require('./add-to-leaderboard'));
leaderboardRouter.use(
    '/add-single-to-leaderboard',
    require('./add-single-to-leaderboard')
);
leaderboardRouter.use(
    '/remove-from-leaderboard',
    require('./remove-from-leaderboard')
);
leaderboardRouter.use('/delete-leaderboard', require('./delete-leaderboard'));
// leaderboardRouter.use('/fetch-tips', require('./fetch-tips'));
leaderboardRouter.use('/update-leaderboard', require('./update-leaderboard'));

module.exports = leaderboardRouter;
