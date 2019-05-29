const async = require('async');
const item = require('../models/itemSchema');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/wearever', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Types.ObjectId;
const Trade = require('../models/tradeSchema');

funct = function () {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            Trade.find({trade_method:'borrow'}).then(function (result) {
                async.each(result, function (props, callback) {
                    if(props.trade_status==2){ //트레이드 상태가 대여 종료
                        console.log('222')
                        callback(null)
                    }
                    else if(props.trade_status==1){ //트레이드 상태가 대여 중
                        if(Date.now()-props.return_date>=0){
                            Trade.updateOne({_id:ObjectId(props._id.toString())},{trade_status:2}).then(function(result){
                                console.log(result)
                                item.updateOne({_id:ObjectId(props.item_id.toString())},{status:0}).then(function(result){
                                    console.log(result)
                                    callback(null)
                                }).catch(function(err){
                                    console.log(err)
                                    callback(null)
                                })
                            }).catch(function(err){
                                console.log(err)
                                callback(null)
                            })
                        }else{
                            callback(null)
                        }
                    }else{ //트레이드 상태가 대여 전
                        if(Date.now()-props.borrow_date>=0){
                            Trade.updateOne({_id:ObjectId(props._id.toString())},{trade_status:1}).then(function(result){
                                console.log(result)
                                item.updateOne({_id:ObjectId(props.item_id.toString())},{status:1}).then(function(result){
                                    console.log(result)
                                    callback(null)
                                }).catch(function(err){
                                    console.log(err)
                                    callback(null)
                                })
                            }).catch(function(err){
                                console.log(err)
                                callback(null)
                            })
                        }else{
                            callback(null)
                        }
                    }
                },function(err) {
                    if(err) {
                        console.log(err);
                        resolve(err);
                    }
                    else resolve("success");
                });
            }).catch(function (err) {
                console.log(err);
                return resolve(err);
            });
        }, 2000);
    });
}


async function main() {
    while(1) {
        console.log('들어옴')
        await funct();
    }
}

main();