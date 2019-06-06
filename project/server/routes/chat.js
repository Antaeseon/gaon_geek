const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chat = require('../models/chatRoom');

var router = express.Router();

/* GET home page. */
router.post('/getRoomNumber', function(req, res, next) {
    chat.find({ buyer_id: req.body.buyer_id,seller_id:req.body.seller_id }, function(err, result) {
        if(result.length==0){
            var saveChat = new chat({
                buyer_id : req.body.buyer_id,
                seller_id : req.body.seller_id
            })

            saveChat.save(function(err){
                if(err){
                    res.status(500).send({ "Response": 500, "tag": err });
                }
                else{
                    res.status(200).json({data:saveChat})
                }
            })
            

        }else{
            res.status(200).json({data:result[0]})
        }
    })   
});

// app.js로 모듈 연결
module.exports = router;