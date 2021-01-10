//This route fetches how much the app has been used
const Route = require('express').Router();
const Usage = require('../../../models/usage');
const authentication = require('../../../middlewares/jwt');
Route.get('/', authentication, async function (req, res) {
    try {
        await Usage.find().then(usage_info => {
            if (!usage_info) {
                return res.status(400).send('No Usage');
            } else {
                return res.status(200).json(usage_info);
            }
        });
    } catch (err) {
        res.status(500).send('Internal Server errror');
    }
});

module.exports = Route;
