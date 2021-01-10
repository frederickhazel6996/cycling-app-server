//Routing for All http requests with url /api/tip

const tipRouter = require('express').Router();
tipRouter.use('/add-tip', require('./add-tip'));
tipRouter.use('/delete-tip', require('./delete-tip'));
tipRouter.use('/fetch-tips', require('./fetch-tips'));
tipRouter.use('/update-tip', require('./update-tip'));

module.exports = tipRouter;
