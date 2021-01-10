//This route fetxhes all the tips in the system

const Route = require('express').Router();
const Tip = require('../../models/tips');
const authentication = require('../../middlewares/jwt');
Route.get('/', authentication, async function (req, res) {
    try {
        await Tip.find().then(tips => {
            if (!tips) {
                return res.status(400).send('No Tips');
            } else {
                return res.status(200).json(tips);
            }
        });
    } catch (err) {
        res.status(500).send('Internal Server errror');
    }
});

module.exports = Route;
