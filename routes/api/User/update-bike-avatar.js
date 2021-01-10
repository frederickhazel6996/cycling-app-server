const Route = require('express').Router();

const { check, validationResult } = require('express-validator');
const Users = require('../../models/user');

const authentication = require('../../middlewares/jwt');
const multer = require('multer');
let AWS = require('aws-sdk');
let spawn = require('spawn-password');
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

Route.post(
    '/',
    authentication,
    upload.single('file'),
    [
        check('email', 'email should not be empty').not().isEmpty(),
        check('email', 'email should be a string').isString(),
        check('email', 'email Should have the email format').isEmail()
    ],

    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            let extra = spawn.spawnAlphaNumericLength(10);
            let timestamp = Date.now();
            let new_fileName = `bikeimage${extra}${timestamp}`;

            const file = req.file;
            const s3FileURL = process.env.AWS_URI;

            let extractedfileName1 = file.originalname.substring(
                file.originalname.lastIndexOf('.'),
                file.originalname.length
            );
            let avatar = `${s3FileURL}bikeapp/bikeimages/${new_fileName}${extractedfileName1}`;

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
                Key: `bikeapp/bikeimages/${new_fileName}${extractedfileName}`,
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

            const { email } = req.body;

            await Users.findOne({
                email: email.toLowerCase()
            }).then(users => {
                if (!users) return req.status(400).send('user does not exist');
                if (users) {
                    Users.updateOne(
                        { email: email.toLowerCase() },
                        {
                            bike_image: avatar
                        }
                    ).then(updatedUser => {
                        res.status(200).send(avatar);
                    });
                }
            });
        } catch (error) {
            res.status(500).send('Internal Server error');
        }
    }
);

module.exports = Route;
