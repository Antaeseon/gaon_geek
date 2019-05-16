const express = require('express');
const bodyParser = require('body-parser');
const item = require('../models/itemSchema');
const Shop = require('../models/shopSchema');
const cors = require('cors');
var fs = require('fs');
const router = express.Router();

/* List all of the item in a country */
/*
    POST /search/getNationItemlist
    {
        nation
    }
*/
router.post('/getNationItemlist', function(req, res, next) {
    Shop.find({ nation: req.body.nation }, function(err, result) {
        if (err) {
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            let id_list = [];
            for (let i = 0; i < result.length; i++)
                id_list.push({ "shop_id": result[i].id });
            item.find({ $or: id_list }, function(err, itemResult) {
                if (itemResult === undefined) {
                    res.status(200).send({ "Response": 200, "data": [] });
                } else if (itemResult !== undefined) {
                    res.status(200).send({ "Response": 200, "data": itemResult });
                } else if (err) {
                    console.log(err);
                }
            })
        }
    });
});

// app.js로 모듈 연결
module.exports = router;