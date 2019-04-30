const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();


router.post('/', function(req, res, next) {
    res.send("잘 도착함");
});

// app.js로 모듈 연결
module.exports = router;