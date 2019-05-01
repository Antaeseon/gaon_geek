const express = require('express');
const bodyParser = require('body-parser');
const enrollSeller = require('./../models/enrollSellerSchema');
const User = require('../models/userSchema');
const cors = require('cors');
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
    // 중복검사
    var enroll_obj = new enrollSeller({
        id: req.body.id,
        shop_name: req.body.shop_name,
        location: req.body.location,
        about_us: req.body.about_us,
        tag: req.body.tag,
        lat: req.body.lat,
        lat: req.body.lon,
        imageNum: req.body.imageNum,
        imageUrl: req.body.imageUrl
    });

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
    })
});

/* Add a new enrollSeller to the db */
/*
    POST /enrollSeller
    {
        id
    }
*/
router.post('/accept', function(req, res, next) {
    // DB에서 User의 판매권한 바꿈 -> User 구현이 완벽하지 않음.
    // User.find({ id: req.body.id }, function(err, result) {
    //     if (err) {
    //         res.status(500).send({ "Response": 500, "tag": err });
    //     } else if (result.length == 0) {
    //         res.send({ "Response": 500, "tag": "Already Nothing" });
    //     } else {
    //         User.findOneAndUpdate({ id: req.body.id }, { isSeller: true }).catch((err) => {
    //             res.send({ "Response": 500, "tag": err });
    //         });
    //         res.send({ "Response": 500, "tag": "Duplicate" });
    //     }
    // }

    // DB에서 enrollSeller 제거
    enrollSeller.deleteMany({ id: req.body.id }, function(err) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            res.status(202).send({ "Response": 202, "tag": "Success" });
        }
    });

});

router.post('/reject', function(req, res, next) {
    // DB에서 enrollSeller 제거
    enrollSeller.deleteMany({ id: req.body.id }, function(err) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            res.status(202).send({ "Response": 202, "tag": "Success" });
        }
    });

});

// app.js로 모듈 연결
module.exports = router;