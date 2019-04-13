const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.send(202, 'with text');
});

// app.js로 모듈 연결
module.exports = router;