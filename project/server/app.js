var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser'); // http로 요청한 클라이언트 쿠키 정보에 접근하기 위한 모듈이다.
var logger = require('morgan'); // http 리퀘스트에 대해 로깅하는 모듈이다.
const mongoose = require('mongoose');
const config = require('./config')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user/user');

// 익스프레스 객체를 생성하고 환경 설정을 한다.

// set up express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// connect to modules
mongoose.connect('mongodb://localhost/wearever');
mongoose.Promise = global.Promise;
// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// print the request log on console
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우팅 설정. 세부 라우팅 설정은 /routes 폴더에 구현된다.
app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handling middleware
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.status(422).send({error: err.messsage});
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;