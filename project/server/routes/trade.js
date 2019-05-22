const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var fs = require('fs');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const Trade = require('../models/tradeSchema');
const Shop = require('../models/shopSchema');
const item = require('../models/itemSchema');
const async = require('async');


router.post('/makeTrade', function (req, res, next) {
    console.log(req.body)
    var trade_obj = new Trade({
        buyer_id: req.body.buyer_id,
        seller_id: req.body.seller_id,
        item_id: ObjectId(req.body.item_id),
        borrow_date: req.body.borrow_date,
        return_date: req.body.return_date,
        is_buy: req.body.is_buy,
        trade_method: req.body.trade_method,
        total_price:req.body.total_price,
        pay_date: Date.now()
    });
    trade_obj.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500).send({
                "Response": 500,
                "tag": err
            });
        } else {
            res.status(202).send({
                "Response": 202,
                "tag": "Success"
            });
        }
    });
});

router.get('/plusVisitor/:id', async function (req, res, next) {
    var Oneitem = await item.findOne({
        _id: ObjectId(req.params.id)
    })
    var Oneshop = await Shop.findOne({
        id: Oneitem.shop_id
    })

    await Shop.updateOne({
        id: Oneshop.id
    }, {
        total_visit: Oneshop.total_visit + 1
    }, (err, output) => {
        if (err) {
            res.status(500).json({
                message: "update fail"
            })
        }
    })


    res.send({
        message: "success"
    })
});

router.get('/getTradeListByItemId/:id', async (req, res) => {
    var tt = await Trade.find({
        item_id: req.params.id
    })
    console.log(tt)
    res.json({
        response: tt
    })
})

router.post('/getItemListByUserId', async (req, res) => {

    Trade.find({buyer_id:req.body.id}).populate('item_id').exec((err, data) => {
        if (err) {
            res.status(500).send({message:err})
        } else {
            console.log(data)
            res.json({response:data})
        }
    });

})

module.exports = router