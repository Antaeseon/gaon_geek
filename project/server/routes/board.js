const express = require('express');
const bodyParser = require('body-parser');
const item = require('../models/itemSchema');
const User = require('../models/userSchema');
const Shop = require('../models/shopSchema');
const review = require('../models/review')
const board = require('../models/board')
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;


router.post('/saveBoard', async (req, res) => {
    console.log('퓨퓨퓨',req.body)
    var newBoard = new board({
        shop_id: req.body.shop_id,
        buyer_id: req.body.buyer_id,
        item_id: req.body.item_id,
        title: req.body.title,
        content: req.body.content,
        answer_content:"",
        date: Date.now(),
        answer_status:false
    
    });

    await newBoard.save(err => {
        if (err) {
            res.status(500).send({
                message: "database error"
            })
        }
    })
    res.send({
        message: "success"
    })
})

router.post('/saveAnswer', async (req, res) => {
    await board.updateOne({_id:ObjectId(req.body.id.toString())},{answer_status:true,answer_content:req.body.answer_content})
    res.send({message:"success"})
})
router.get('/getBoard/:id', async (req, res) => {
    var boardList = await board.find({item_id:req.params.id})
    res.send({data:boardList})
})



module.exports = router;