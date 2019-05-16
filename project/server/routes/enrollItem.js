const express = require('express');
const bodyParser = require('body-parser');
const item = require('../models/itemSchema');
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
        bucket: "weareverstorage",
        key: function(req, file, cb) {
            let extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension);
        },
        acl: 'public-read-write',
    })
});

/* Add a new item to the db */
/*
    POST /enrollItem
    {
        shop_id
        item_name
        brand
        color
        category
        size
        tag
        detail
        state
        material
        price
        status
        imageNum
        imageUrl
    }
*/
//[{ name: 'img' }, { name: 'certificateFile' }]
router.post('/', upload.array('img'), function(req, res, next) {
    var imagelist = [];
    for (var i = 0; i < req.body.imageNum - 1; i++) {
        imagelist.push(req.files[i].key);
    }
    var certificate = req.files[req.body.imageNum - 1].key;
    var item_obj = new item({
        shop_id: req.body.shop_id,
        item_name: req.body.item_name,
        brand: req.body.brand,
        color: req.body.color,
        category: req.body.category,
        size: req.body.size,
        tag: req.body.tag,
        detail: req.body.detail,
        state: req.body.state,
        material: req.body.material,
        price: req.body.price,
        status: 0,
        imageNum: req.body.imageNum,
        imageUrl: imagelist,
        certificateUrl: certificate
    });
    item_obj.save(function(err) {
        if (err) {
            console.log(err);
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            res.status(202).send({ "Response": 202, "tag": "Success" });
        }
    });

});

/* List all of the item of a users */
/*
    POST /enrollSeller/lists
    {
        id
    }
*/
router.post('/lists', function(req, res, next) {
    item.find({ shop_id: req.body.shop_id }, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            res.status(202).send({ "Response": 202, "body": result });
        }
    });
});

/* Add a new item to the db */
/*
    POST /enrollItem/modify
    {
        _id
        item_name
        brand
        color
        category
        size
        tag
        detail
        state
        material
        price
        status
    }
*/
router.post('/modify', upload.array('img'), function(req, res, next) {
    item.findOneAndUpdate({ _id: req.body._id }, {
        item_name: req.body.item_name,
        brand: req.body.brand,
        color: req.body.color,
        category: req.body.category,
        size: req.body.size,
        tag: req.body.tag,
        detail: req.body.detail,
        state: req.body.state,
        material: req.body.material,
        price: req.body.price,
        status: req.body.status
    }, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
            console.log(err);
        } else {
            item.findOne({ _id: req.body._id }, function(errr, newresults) {
                if (err) {
                    res.status(500).send({ "Response": 500, "tag": err });
                } else {
                    res.status(202).send({ "Response": 202, "tag": "Success", "data": newresults, "index": req.body.index });
                }
            });
        }
    });

});

// app.js로 모듈 연결
module.exports = router;