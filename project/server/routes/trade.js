const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var fs = require('fs');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const Trade = require('../models/tradeSchema');


router.post('/makeTrade', function(req, res, next) {
    console.log(req.body)
    var trade_obj = new Trade({
        buyer_id: req.body.buyer_id,
        seller_id: req.body.seller_id,
        item_id: req.body.item_id,
        borrow_date: req.body.borrow_date,
        return_date: req.body.return_date,
        is_buy: req.body.is_buy,
        trade_method: req.body.trade_method
    });

    trade_obj.save(function(err) {
        if (err) {
            console.log(err);
            res.status(500).send({ "Response": 500, "tag": err });
        } else {
            res.status(202).send({ "Response": 202, "tag": "Success" });
        }
    });
});






module.exports=router