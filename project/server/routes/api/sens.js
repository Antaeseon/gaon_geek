const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs');
const router = express.Router();

router.post('/sendMessage', async function (req, res, next) {
    var axios=require('axios')
    axios.defaults.headers.common['X-NCP-auth-key'] = 'YiLj2tBYzlQ4R1OFljbt'
    axios.defaults.headers.common['X-NCP-service-secret'] = '9909bd995b54431eaa1384094dd9a840' 
    await axios
        .post(
            "https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:255920239534:wearever/messages", {
                type: "sms",
                contentType: "COMM",
                countryCode: "82",
                from: "01052817702",
                to: [req.body.phone],
                content: req.body.message
            }
        )
        .then(result => {
            console.log(result);
            res.send({message:"clear"})
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message:err})
        });
});

module.exports = router;