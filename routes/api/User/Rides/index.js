//Routing for All http requests with url /api/user/ride

const rideRouter = require('express').Router();
rideRouter.use('/fetch-all-rides', require('./fetch-all-rides'));
rideRouter.use('/fetch-rides', require('./fetch-rides'));
rideRouter.use('/fetch-usage', require('./fetch-usage'));
rideRouter.use('/update-usage', require('./update-usage'));

module.exports = rideRouter;
