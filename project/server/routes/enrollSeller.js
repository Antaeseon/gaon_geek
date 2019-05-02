const express = require('express');
const bodyParser = require('body-parser');
const enrollSeller = require('./../models/enrollSellerSchema');
const User = require('../models/userSchema');
const Shop = require('../models/shopSchema');
const cors = require('cors');
var fs = require('fs');
const router = express.Router();

const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'resources/images/');
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
});

/* Add a new enrollSeller to the db */
/*
    POST /enrollSeller
    {
        id
        shop_name
        location
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
    User.find({ id: req.body.id }, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else if (result.length == 0) {
            res.send({ "Response": 500, "tag": "There is no user which has a such name." });
        } else {
            if (result[0].isSeller === false) {
                // enrollSeller Schema 구성
                var enroll_obj = new enrollSeller({
                    id: req.body.id,
                    shop_name: req.body.shop_name,
                    location: req.body.location,
                    about_us: req.body.about_us,
                    tag: req.body.tag,
                    lat: req.body.lat,
                    lon: req.body.lon,
                    imageNum: req.body.imageNum,
                    imageUrl: req.body.imageUrl
                });
                // 중복 제출 검사
                enrollSeller.find({ id: req.body.id }, function(err, result) {
                    if (err) {
                        res.status(500).send({ "Response": 500, "tag": err });
                    } else if (result.length == 0) {
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
router.post('/accept', function(req, res, next) {
    // DB에서 User의 판매권한 바꿈 -> User 구현이 완벽하지 않음.
    User.find({ id: req.body.id }, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else if (result.length == 0) {
            res.send({ "Response": 500, "tag": "Already Nothing" });
        } else {
            User.findOneAndUpdate({ id: req.body.id }, { isSeller: true }).catch((err) => {
                res.send({ "Response": 500, "tag": err });
            });
        }
    });

    // DB에 Shop Schema 추가
    enrollSeller.find({ id: req.body.id }, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            console.log(result);
            var shop_obj = new Shop({
                id: result[0].id,
                location: result[0].location,
                shop_name: result[0].shop_name,
                about_us: result[0].about_us,
                tag: result[0].tag,
                lat: result[0].lat,
                lon: result[0].lon,
                imageNum: result[0].imageNum,
                imageUrl: result[0].imageUrl,
                enroll_Date: Date.now(),
                rating: 0.0,
                total_visit: 0
            });
            shop_obj.save(function(err) {
                if (err) {
                    res.status(500).send({ "Response": 500, "tag": err });
                    console.log(err);
                    return;
                }
            })
        }
    });

    // DB에서 enrollSeller 제거 
    enrollSeller.deleteMany({ id: req.body.id }, function(err) {
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
    enrollSeller.deleteMany({ id: req.body.id }, function(err) {
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
        shop_name: req.body.shop_name,
        about_us: req.body.about_us,
        tag: req.body.tag,
        lat: req.body.lat,
        lon: req.body.lon,
    }, function(err) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
            console.log(err);
        } else {
            res.status(202).send({ "Response": 202, "tag": "Success" });
        }
    });
});

// app.js로 모듈 연결
module.exports = router;