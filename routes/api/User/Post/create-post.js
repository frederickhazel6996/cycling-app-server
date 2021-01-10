const Route = require('express').Router();
const { check, validationResult } = require('express-validator');
const Post = require('../../../models/post');
const moment = require('moment');
const spawn = require('spawn-password');
const authentication = require('../../../middlewares/jwt');
const multer = require('multer');
var AWS = require('aws-sdk');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

Route.post(
    '/',
    authentication,
    upload.array('file'),

    [
        check('owner_email', 'email should not be empty')
            .not()
            .isEmpty()
            .isString()
            .isEmail(),
        check('post', 'post should not be empty').not().isEmpty().isString()
    ],
    async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            let extra = spawn.spawnAlphaNumericLength(10);
            let timestamp = Date.now();
            let new_fileName = `postimage${extra}${timestamp}`;
            let picture_holder = [];
            let i = 0;

            const file = req.files;
            const s3FileURL = process.env.AWS_URI;

            while (i < file.length) {
                let extractedfileName1 = file[i].originalname.substring(
                    file[i].originalname.lastIndexOf('.'),
                    file[i].originalname.length
                );
                picture_holder.push(
                    `${s3FileURL}bikeapp/postimages/${new_fileName}${i}${extractedfileName1}`
                );
                i++;
            }

            let s3bucket = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
                region: process.env.AWS_REGION
            });
            let p = 0;
            file.map(item => {
                let extractedfileName = item.originalname.substring(
                    item.originalname.lastIndexOf('.'),
                    item.originalname.length
                );

                let params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `bikeapp/postimages/${new_fileName}${p}${extractedfileName}`,
                    Body: item.buffer,
                    ContentType: item.mimetype,
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
                p++;
            });

            const { post, owner_email } = req.body;

            let temp_id = `POST${spawn
                .spawnAlphaNumericLength(15)
                .toUpperCase()}`;

            const _post = new Post({
                post,
                owner_email: owner_email.toLowerCase(),
                id: temp_id,
                images: picture_holder,
                type: 1,
                date_created: moment().format('MMM Do YYYY'),
                likes: 0,
                comments: 0
            });
            _post.save().then(post => {
                return res.send(picture_holder);
            });
        } catch (err) {
            res.status(500).send('Internal Server errror');
        }
    }
);

module.exports = Route;
