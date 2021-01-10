//Routing for all requests that hits the servers

const APIRouter = require('express').Router();

APIRouter.use('/admin', require('./Admin'));
APIRouter.use('/user', require('./User'));
APIRouter.use('/tip', require('./Tip'));
APIRouter.use('/rat', require('./Rat'));

module.exports = APIRouter;
