//Routing for All http requests with url /api/admin

const adminRouter = require('express').Router();
adminRouter.use('/register', require('./register'));
adminRouter.use('/add-user', require('./add-user'));
adminRouter.use('/fetch-users', require('./fetch-users'));
adminRouter.use('/login', require('./login'));
adminRouter.use('/delete-user', require('./delete-user'));
adminRouter.use('/update-user', require('./update-user'));

module.exports = adminRouter;
