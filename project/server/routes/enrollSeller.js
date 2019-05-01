const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'resources/images/');
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/', upload.array('img'), function(req, res, next) {
    console.log(req.body);
    // console.log(req.files);
    res.send("잘 도착함");
});

// app.js로 모듈 연결
module.exports = router;