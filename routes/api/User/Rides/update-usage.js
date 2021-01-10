const Route = require('express').Router();

const Usage = require('../../../models/usage');
const Ride = require('../../../models/ride');
const User = require('../../../models/user');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const authentication = require('../../../middlewares/jwt');

Route.post(
    '/',
    authentication,

    [
        check('email', 'email should not be empty').not().isEmpty(),
        check('email', 'email should be a string').isString(),
        check('email', 'email Should have the email format').isEmail(),

        check('cycling_time_taken', 'cycling_time_taken should  not be empty')
            .not()
            .isEmpty(),
        check(
            'cycling_time_taken',
            'cycling_time_taken should be a string'
        ).isString(),
        check(
            'cycling_distance_covered',
            'cycling_distance_covered should  not be empty'
        )
            .not()
            .isEmpty(),
        check(
            'cycling_distance_covered',
            'cycling_distance_covered should be a string'
        ).isString(),
        check('date', 'date  should  not be empty').not().isEmpty(),
        check('date', 'date should be a string').isString(),
        check('time', 'time  should  not be empty').not().isEmpty(),
        check('time', 'time should be a string').isString(),
        check('calories', 'calories  should  not be empty').not().isEmpty(),
        check('calories', 'calories should be a string').isString(),
        check('cash', 'cash  should  not be empty').not().isEmpty(),
        check('cash', 'cash should be a string').isString(),
        check('carbon', 'carbon  should  not be empty').not().isEmpty(),
        check('carbon', 'carbon should be a string').isString()
    ],
    async function (req, res) {
        try {
            const {
                email,
                cycling_time_taken,
                cycling_distance_covered,
                date,
                time,
                calories,
                cash,
                carbon
            } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            let total_calories = 0;
            let total_cash = 0;
            let total_carbon = 0;
            let total_calories1 = 0;
            let total_cash1 = 0;
            let total_carbon1 = 0;
            let temp_day = moment().format('MMMM Do YYYY').toLowerCase();
            let temp_month = moment().format('MMMM').toLowerCase();
            let temp_year = moment().format('YYYY').toLowerCase();

            const rideObject = new Ride({
                email: email.toLowerCase(),
                cycling_time_taken: cycling_time_taken,
                cycling_distance_covered: cycling_distance_covered,
                date,
                time,
                calories,
                cash,
                carbon,

                exactDate: Date.now()
            });
            await Usage.findOne({ day: temp_day }).then(usage => {
                if (!usage) {
                    Ride.find({ email: email.toLowerCase() }).then(ride => {
                        var i = 0;

                        while (i < ride.length) {
                            if (
                                parseFloat(ride[i].calories === null) ||
                                parseFloat(ride[i].cash === null) ||
                                parseFloat(ride[i].carbon === null)
                            ) {
                                continue;
                            }
                            total_calories += parseFloat(ride[i].calories);
                            total_carbon += parseFloat(ride[i].carbon);
                            total_cash += parseFloat(ride[i].cash);

                            i++;
                        }

                        const usages = new Usage({
                            day: temp_day,
                            month: temp_month,
                            Year: temp_year,

                            usage_count: 1
                        });

                        User.updateOne(
                            { email: email.toLowerCase() },
                            {
                                total_calories:
                                    total_calories + parseFloat(calories),
                                total_carbon: total_carbon + parseFloat(carbon),
                                total_cash: total_cash + parseFloat(cash)
                            }
                        ).then(rides => {
                            usages.save().then(usages => {
                                rideObject.save().then(ride => {
                                    return res.status(201).send('updated');
                                });
                            });
                        });
                    });
                } else {
                    Ride.find({ email: email.toLowerCase() })
                        .then(rider => {
                            var i = 0;

                            while (i < rider.length) {
                                if (
                                    parseFloat(rider[i].calories === null) ||
                                    parseFloat(rider[i].cash === null) ||
                                    parseFloat(rider[i].carbon === null)
                                ) {
                                    continue;
                                }
                                total_calories1 += parseFloat(
                                    rider[i].calories
                                );
                                total_carbon1 += parseFloat(rider[i].carbon);
                                total_cash1 += parseFloat(rider[i].cash);

                                i++;
                            }
                            /*  console.log(
                                total_calories1,
                                total_cash1,
                                total_carbon1
                            ); */
                        })
                        .then(riders => {
                            User.updateOne(
                                { email: email.toLowerCase() },
                                {
                                    total_calories:
                                        total_calories1 + parseFloat(calories),
                                    total_carbon:
                                        total_carbon1 + parseFloat(carbon),
                                    total_cash: total_cash1 + parseFloat(cash)
                                }
                            ).then(riderss => {
                                let temp_count = usage.usage_count + 1;
                                Usage.updateOne(
                                    { day: temp_day },
                                    { usage_count: temp_count }
                                ).then(usages => {
                                    rideObject.save().then(ride => {
                                        return res.status(200).send('updated');
                                    });
                                });
                            });
                        });
                }
            });
        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = Route;
