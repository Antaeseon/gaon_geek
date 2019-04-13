const express = require('express');
const User = require('../../models/userSchema');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken')

/* Get users listing.
    GET /
*/
router.get('/', function(req, res, next) {
    User.find().then(user => {
        res.send(user);
    }).catch(next);
});

/* Add a new user to the db */
/*
    POST /user/signup/
    {
        id
        pwd
        name
        nation
        phoneNum
        email
    
    }
*/
router.post('/signup', function(req, res, next) {
    req.body.signup_Date = Date.now();
    // create가 성공적이면, then 이후를 실행. 에러가 일어나면 catch가 실행.
    User.create(req.body).then(complete => {
        res.send(complete);
    }).catch(next);
});

/*

*/
/* Update a user in the db */
/*
    POST /user/modify/
    {
        id
        pwd
        name
        nation
        phoneNum
        email
    
    }
*/
router.put('/modify', function(req, res, next) {
    User.findOneAndUpdate({ id: req.body.id }, req.body).then(user => {
        User.findOne({ id: req.body.id }).then(user => {
            res.send(user);
        }).catch(next);
    }).catch(next);
});

/* Delte a user in the db
POST /user/delete/
{
    id
}
*/
router.post('/delete', function(req, res, next) {
    User.findOneAndRemove(req.body).then(user => {
        res.send(user);
    }).catch(next);
});

/*
    POST /user/login/
    {
        id
        pwd
    }
*/
router.post('/login', (req, res, next) => {
    User.findOne({ id: req.body.id }).then(user => {
        if (req.body.pwd === user.pwd) {
            // create a promise that generates jwt asynchronously
            const userToken = getToken(req, user);
            res.status(202).send({ "Response": 202, "token": userToken });
        } else res.status(400).send({ "Response": 400, "error": "아이디와 비밀번호를 확인해주세요." });
    }).catch(next);
});

/*
    POST /user/check/
    {
        accessToken
    }
*/
router.post('/check', (req, res, next) => {
    const secret = req.app.get('jwt-secret');
    var token = req.get('accessToken');
    if (typeof token !== 'undefined') {
        var decoded = jwt.verify(token, secret);
        User.findOne({ id: decoded.id }).then(user => {
            res.send({ "Response": 202, "token": token });
        }).catch(function(err) {
            res.status(400).send({
                "Response": 400,
                "error": err.message
            });
        });
    } else {
        res.status(403).send({
            "Response": 403,
            "error": "로그인 토큰이 잘못된 형식입니다."
        });
    }
});

function getToken(req, user) {
    const secret = req.app.get('jwt-secret');
    var token = jwt.sign({
            id: user.id,
        },
        secret, {
            expiresIn: '1h',
            issuer: 'wearever.com'
        })
    return token;
}

// app.js로 모듈 연결
module.exports = router;