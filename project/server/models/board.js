const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model
const BoardSchema = new Schema({
    shop_id: {
        type: String,
    },
    buyer_id: {
        type: String,
    },
    item_id: {
        type: String,
    },
    title: {
        type: String,
    },
    content:{
        type:String
    },
    answer_content:{
        type:String,
        default:""
    },
    date: {
        type: Date,
        default: Date.now
    },
    answer_status:{
        type:Boolean,
        default:false
    }

});

// Collection 이름 지정
const Board = mongoose.model('board', BoardSchema);

module.exports = Board;