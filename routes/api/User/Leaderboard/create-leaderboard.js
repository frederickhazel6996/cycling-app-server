//This route adds a tip to the system
const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Leaderboard = require('../../../models/leaderboard');
const User = require('../../../models/user');
const UserBoard = require('../../../models/userboards');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../../middlewares/jwt');
const multer = require('multer');

let AWS = require('aws-sdk');
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

Route.post(
    '/',
    authentication,
    upload.single('file'),

    [
        check('name', 'name should not be empty').not().isEmpty().isString(),
        check('owner_email', 'email should not be empty')
            .not()
            .isEmpty()
            .isString()
            .isEmail()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            let extra = spawn.spawnAlphaNumericLength(10);
            let timestamp = Date.now();
            let new_fileName = `leaderboardimage${extra}${timestamp}`;

            const file = req.file;
            const s3FileURL = process.env.AWS_URI;

            let extractedfileName1 = file.originalname.substring(
                file.originalname.lastIndexOf('.'),
                file.originalname.length
            );
            let avatar = `${s3FileURL}bikeapp/leaderboardimages/${new_fileName}${extractedfileName1}`;

            let s3bucket = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
                region: process.env.AWS_REGION
            });

            let extractedfileName = file.originalname.substring(
                file.originalname.lastIndexOf('.'),
                file.originalname.length
            );

            let params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `bikeapp/leaderboardimages/${new_fileName}${extractedfileName}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read'
            };

            s3bucket.upload(params, async function (err, data) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        Message: err
                    });
                } else {
                    //
                }
            });

            const { name, owner_email } = req.body;

            let temp_id = `BOARD${spawn
                .spawnAlphaNumericLength(15)
                .toUpperCase()}`;

            const leaderboard = new Leaderboard({
                id: temp_id,
                name,
                owner_email: owner_email.toLowerCase(),
                image_url: avatar,
                date_created: moment().format('MMM Do YYYY')
            });

            await Leaderboard.findOne({ name: name }).then(leaderboards => {
                if (!leaderboards) {
                    leaderboard.save().then(users => {
                        User.findOne({
                            email: owner_email.toLowerCase()
                        }).then(users => {
                            const userboard = new UserBoard({
                                user_email: owner_email.toLowerCase(),
                                leaderboard_id: temp_id,
                                isOwner: true,
                                user: users
                            });

                            userboard.save().then(userboardss => {
                                return res.send({
                                    leaderboard_id: temp_id,
                                    avatar: avatar
                                });
                            });
                        });
                    });
                } else {
                    return res
                        .status(200)
                        .send('Leaderboard with ' + name + ' already exists');
                }
            });
        } catch (error) {
            res.status(500).status('Internal Server error');
        }
    }
);

module.exports = Route;
