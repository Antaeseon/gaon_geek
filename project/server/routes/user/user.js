const express = require('express');
const User = require('../../models/userSchema');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('../../config')


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
    // req.body.signup_Date = Date.now();
    // crypto.randomBytes(64, (err, buf) => {
    //     crypto.pbkdf2(req.body.pwd, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
    //       console.log(key.toString('base64'));
    //       req.body.pwd=key.toString('base64')
    //     });
    //   });
    let  cipher = crypto.createCipher('aes192', config.secret);
    cipher.update(req.body.pwd,'utf8', 'base64');
    let cipherPw = cipher.final('base64');
  
    console.log(req.body)
    var user_obj = new User({
        id: req.body.id,
        name: req.body.name,
        pwd: cipherPw,
        nation: req.body.nation,
        phoneNum: req.body.phoneNum,
        email: req.body.email,
        signup_Date: Date.now(),
        point: 0, // empty array
        isSeller : false
    });

    User.find({id:req.body.id},function(err,result){
        if(err){
            console.log(err);
            res.status(500).send({message: "database_fail1"});
        }
        else if(result.length==0){
            user_obj.save(function(err){
                if (err) {
                    res.status(500).send({message: "database_fail2"});
                    console.log(err)
                }
                else{
                    res.send({message:"create"})
                }
            })
        }else{
            res.send({message:"already exist"})
        }
    })

    // // create가 성공적이면, then 이후를 실행. 에러가 일어나면 catch가 실행.
    // User.create(req.body).then(complete => {
    //     res.send(complete);
    // }).catch(next);
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
router.post('/login', function (req, res, next) {
    let {
      id,
      pwd
    } = req.body;
    
    let  cipher = crypto.createCipher('aes192', config.secret);
    cipher.update(req.body.pwd,'utf8', 'base64');
    let cipherPw = cipher.final('base64');
    pwd=cipherPw
    const secret = req.app.get('jwt-secret');
    console.log("secrete : ", secret);
    console.log(id, pwd);
    // check exist user
    const check = function (user) {
      if (!user) { //유저 존재 안함
        throw new Error('user not exist');
      } else {
        if (user.verify(pwd)) { //비밀번호 맞음
          const p = new Promise((resolve, reject) => {
            jwt.sign({
                id: user.id
              },
              secret, {
                expiresIn: '7d',
              },
              (err, token) => {
                if (err) reject(err);
                resolve(token);
              }
            )
          });
          return p;
        } else { //비밀번호 틀림
          throw new Error('incorrect password');
        }
      }
    };
  
    // return token
    const respond = function (Token) {
      console.log(Token)
      res.json({
        message: 'logged in successfully',
        Token
      });
    };
  
    // Error handling
    const onError = function (error) {
      console.log("-------------------------this", error.message)
      res.status(405).json({
        message: error.message
      })
    };
  
    User.findOneById(id)
      .then(check)
      .then(respond)
      .catch(onError);
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