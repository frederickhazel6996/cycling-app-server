//This route fetches all Admins from the database
const Route = require('express').Router();
const Admin = require('../../models/admin');
const authentication = require('../../middlewares/jwt');
Route.get('/', authentication, async function (req, res) {
    try {
        await Admin.find().then(admins => {
            if (!admins) {
                return res.status(400).send('No Admins');
            } else {
                return res.status(200).json(admins);
            }
        });
    } catch (err) {
        res.status(500).send('Internal Server errror');
    }
});

module.exports = Route;
