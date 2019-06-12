const express = require('express');
const bodyParser = require('body-parser');
const item = require('../models/itemSchema');
const User = require('../models/userSchema');
const Shop = require('../models/shopSchema');
const review = require('../models/review')
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;


router.post('/saveReview', async (req, res) => {
    var newReview = new review({
        shop_id: req.body.shop_id,
        buyer_id: req.body.buyer_id,
        item_id: req.body.item_id,
        contents: req.body.contents,
        rating: req.body.rating
    });

    await newReview.save(err => {
        if (err) {
            res.status(500).send({
                message: "database error"
            })
        }
    })
    var allReview = await review.find({
        shop_id: req.body.shop_id
    })
    var sum = 0
    allReview.forEach(function (prop) {
        sum += prop.rating
    })
    console.log('레이팅 합', sum)
    await Shop.updateOne({
        id: req.body.shop_id
    }, {
        rating: Math.floor(sum/allReview.length)
    })
    res.send({
        message: "success"
    })

})

module.exports = router;