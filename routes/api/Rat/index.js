//Routing for All http requests with url /api/rat

const ratRouter = require('express').Router();

ratRouter.use('/login', require('./login'));
ratRouter.use('/register', require('./register'));
ratRouter.use('/fetch-users', require('./fetch-users'));
ratRouter.use('/fetch-request', require('./fetch-request'));

ratRouter.use('/delete-user', require('./delete-user'));
ratRouter.use('/update-user', require('./update-user'));

module.exports = ratRouter;
