const Route = require('express').Router();
const Rat = require('../../models/rat');
const authentication = require('../../middlewares/jwt');
Route.get('/', authentication, async function (req, res) {
    try {
        await Rat.find().then(rats => {
            if (!rats) {
                return res.status(400).send('No Member');
            } else {
                return res.status(200).json(rats);
            }
        });
    } catch (err) {
        res.status(500).send('Internal Server errror');
    }
});

module.exports = Route;
