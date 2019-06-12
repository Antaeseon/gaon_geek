const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model
const ReviewSchema = new Schema({
    shop_id: {
        type: String,
    },
    buyer_id: {
        type: String,
    },
    item_id: {
        type: String,
    },
    contents: {
        type: String,
    },
    rating:{
        type:Number
    },
    date: {
        type: Date,
        default: Date.now
    }

});

// Collection 이름 지정
const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;