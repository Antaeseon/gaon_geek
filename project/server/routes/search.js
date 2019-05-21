const express = require('express');
const bodyParser = require('body-parser');
const item = require('../models/itemSchema');
const mongoose = require('mongoose');
const Shop = require('../models/shopSchema');
const cors = require('cors');
var fs = require('fs');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

/* List all of the item in a country */
/*
    POST /search/getNationItemlist
    {
        nation
    }
*/
router.post('/getNationShoplist', function(req, res, next) {
    Shop.find({ nation: req.body.nation }, function(err, shopresult) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            if (shopresult === undefined) {
                res.status(200).send({ "Response": 200, "data": [] });
            } else if (shopresult !== undefined) {
                res.status(200).send({ "Response": 200, "data": shopresult });
            } else if (err) {
                console.log(err);
            }
        }
    });
});

/* List all of the item in a country */
/*
    POST /search/getItemlist
    {
        nation
    }
*/
router.post('/getItemlist', function(req, res, next) {
    item.find({ shop_id: req.body.shop_id }, function(err, itemResult) {
        console.log(itemResult);
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            if (itemResult === undefined) {
                res.status(200).send({ "Response": 200, "data": [] });
            } else if (itemResult !== undefined) {
                res.status(200).send({ "Response": 200, "data": itemResult });
            } else if (err) {
                console.log(err);
            }
        }
    })
});

/* List just one Item for using detail */
/*
    POST /search/getNationItemlist
    {
        nation
    }
*/
router.get('/getOneItem/:id', async(req, res) => {
    let singleItem = await item.findOne({ _id: ObjectId(req.params.id) })
    console.log(singleItem)
    res.json({ response: singleItem })
})

// app.js로 모듈 연결
module.exports = router;