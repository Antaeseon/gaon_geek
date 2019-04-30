var express = require('express');
var router = express.Router();

const multer = require('multer');
// Multer Middleware
const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
        }
    }),
    limits: { fileSize: 100 * 1024 * 1024 }
});

module.exports = router;