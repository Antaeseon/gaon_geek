const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const crypto = require('crypto')
const config = require('../../config')




router.post('/login', function(req, res, next) {
    console.log(req.body)
    if(req.body.id!=config.adminId){
        res.status(500).json({
                message:'incorrect id'
            }
        )
    }
    else if(req.body.password!=config.adminPass){
        res.status(500).json({
            message:'incorrect password'

        })
    }else{
        res.status(200).json({
            message:'login success'
        })
    }
});





module.exports = router;