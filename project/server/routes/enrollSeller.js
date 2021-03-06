const express = require('express');
const bodyParser = require('body-parser');
const enrollSeller = require('../models/enrollSellerSchema');
const User = require('../models/userSchema');
const Shop = require('../models/shopSchema');
const cors = require('cors');
var fs = require('fs');
const router = express.Router();

const multer = require("multer");
let AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../awsconfig.json");
let s3 = new AWS.S3();
let multerS3 = require("multer-s3");
let path = require("path");

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "wearever1",
        key: function(req, file, cb) {
            let extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension);
        },
        acl: 'public-read-write',
    })
});

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, 'resources/images/');
//         },
//         filename: function(req, file, cb) {
//             cb(null, file.originalname);
//         }
//     }),
//     limits: { fileSize: 10 * 1024 * 1024 },
// });

/* Add a new enrollSeller to the db */
/*
    POST /enrollSeller
    {
        id
        shop_name
        location
        nation
        about_us
        tag
        lat
        lon
        imageNum
        imageUrl
    }
*/
router.post('/', upload.array('img'), function(req, res, next) {
    // 이미 제출했는지 검사
    // console.log(req.file)
    User.find({ id: req.body.id }, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else if (result.length == 0) {
            res.send({ "Response": 500, "tag": "There is no user which has a such name." });
        } else {
            if (result[0].isSeller === false) {
                var imagelist = [];
                for (var i = 0; i < 2; i++) {
                    imagelist.push(req.files[i].key);
                }
                // enrollSeller Schema 구성
                var enroll_obj = new enrollSeller({
                    id: req.body.id,
                    shop_name: req.body.shop_name,
                    location: req.body.location,
                    nation: req.body.nation,
                    about_us: req.body.about_us,
                    tag: req.body.tag,
                    lat: req.body.lat,
                    lon: req.body.lon,
                    imageNum: req.body.imageNum,
                    imageUrl: imagelist
                });
                // 중복 제출 검사
                enrollSeller.find({ id: req.body.id }, function(err, resultDupCheck) {
                    if (err) {
                        res.status(500).send({ "Response": 500, "tag": err });
                    } else if (resultDupCheck.length == 0) {
                        enroll_obj.save(function(err) {
                            if (err) {
                                res.status(500).send({ "Response": 500, "tag": err });
                                console.log(err);
                            } else {
                                res.status(202).send({ "Response": 202, "tag": "Success" });
                            }
                        })
                    } else {
                        res.send({ "Response": 500, "tag": "Duplicate" });
                    }
                });
            } else {
                res.send({ "Response": 500, "tag": "Already Seller" });
            }
        }
    });
});

/* Accept the enrollSeller */
/*
    관리자 query
    POST /enrollSeller/accept
    {
        id
    }
*/
router.post('/accept', async function(req, res, next) {
    // DB에서 User의 판매권한 바꿈 -> User 구현이 완벽하지 않음.
    console.log(req.body.id)
    var user = await User.find({ id: req.body.id });
    if (user.length == 0)
        res.status(500).send({ message: "user not existed" });
    else
        console.log('dd', user)
        //user 업데이트
    user = user[0]
    console.log('aaa', user)
    await User.updateOne({ id: user.id }, { isSeller: true }, (err, output) => {
            if (err) {
                res.status(500).json({ message: "update fail" })
            }
            console.log(user)
        })
        //user 업데이트 완료




    // DB에 Shop Schema 추가
    enrollSeller.find({ id: user.id }, async function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            console.log(result);
            var shop_obj = new Shop({
                id: result[0].id,
                location: result[0].location,
                nation: result[0].nation,
                shop_name: result[0].shop_name,
                about_us: result[0].about_us,
                tag: result[0].tag,
                lat: result[0].lat,
                lon: result[0].lon,
                imageNum: result[0].imageNum,
                imageUrl: result[0].imageUrl,
                enroll_Date: Date.now(),
            });
            console.log('shop', shop_obj)
            await shop_obj.save(function(err) {
                if (err) {
                    res.status(500).send({ "Response": 500, "tag": err });
                    console.log(err);
                }
            })
        }
    });

    // DB에서 enrollSeller 제거 
    enrollSeller.deleteOne({ id: user.id }, function(err) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            res.status(202).send({ "Response": 202, "tag": "Success" });
        }
    });
});
/* Reject the enrollSeller */
/*
    관리자 query
    POST /enrollSeller/reject
    {
        id
    }
*/
router.post('/reject', function(req, res, next) {
    enrollSeller.deleteOne({ id: req.body.id }, function(err) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            res.status(202).send({ "Response": 202, "tag": "Success" });
        }
    });
});

/* List all of the enrollSellers */
/*
    관리자 query
    GET /enrollSeller/lists
*/
router.get('/lists', function(req, res, next) {
    // DB에서 enrollSeller 모두 불러옴
    enrollSeller.find({}, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            res.status(202).send({ "Response": 202, "body": result });
        }
    });
});


/* Get Seller Info of the enrollSeller */
/*
    POST /enrollSeller/getSellerInfo
    {
        id
    }
*/
router.post('/getSellerInfo', function(req, res, next) {
    Shop.find({ id: req.body.id }, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else if (result.length == 0) {
            res.send({ "Response": 500, "tag": "You are not Seller" });
        } else {
            res.status(202).send({ "Response": 202, "body": result });
        }
    });
});

/* Modify Seller Info of the enrollSeller */
/*
    POST /enrollSeller/modifySellerInfo
    {
        id
    }
*/
router.post('/modifySellerInfo', upload.array('img'), function(req, res, next) {
    Shop.findOneAndUpdate({ id: req.body.id }, {
        location: req.body.location,
        nation: req.body.nation,
        shop_name: req.body.shop_name,
        about_us: req.body.about_us,
        tag: req.body.tag,
        lat: req.body.lat,
        lon: req.body.lon,
    }, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
            console.log(err);
        } else {
            Shop.findOne({ id: req.body.id }, function(errr, newresults) {
                if (err) {
                    res.status(500).send({ "Response": 500, "tag": err });
                } else {
                    res.status(202).send({ "Response": 202, "tag": "Success", "data": newresults });
                }
            });
        }
    });
});

// app.js로 모듈 연결
module.exports = router;