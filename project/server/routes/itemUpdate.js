const express = require('express');
const bodyParser = require('body-parser');
const item = require('../models/itemSchema');
const User = require('../models/userSchema');
const Shop = require('../models/shopSchema');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;


router.post('/itemStatusUpdate',async (req,res)=>{
    await item.updateOne({ _id: ObjectId(req.body.id) }, { status: req.body.status }, (err, output) => {
        if (err) {
            res.status(500).json({ message: "update fail" })
        }
        console.log(output) 
        res.json({message:"update success"})
    })

})

module.exports = router;