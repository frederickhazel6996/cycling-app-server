//Routing for All http requests with url /api/rat

const ratRouter = require('express').Router();

ratRouter.use('/login', require('./login'));
ratRouter.use('/register', require('./register'));

module.exports = ratRouter;
