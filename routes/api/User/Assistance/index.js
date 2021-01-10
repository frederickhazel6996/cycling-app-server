//Routing for All http requests with url /api/tip

const assistanceRouter = require('express').Router();
assistanceRouter.use('/request-assistance', require('./request-assistance'));
assistanceRouter.use('/assistance-feedback', require('./assistance-feedback'));
assistanceRouter.use('/create-ride-request', require('./create-ride-request'));
assistanceRouter.use(
    '/fetch-all-ride-requests',
    require('./fetch-all-ride-requests')
);

module.exports = assistanceRouter;
