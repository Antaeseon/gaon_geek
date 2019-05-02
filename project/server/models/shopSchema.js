const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model
const ShopSchema = new Schema({
    id: {
        type: String,
        required: [true, 'User id field is required'],
        unique: true
    },
    location: {
        type: String,
        required: [true, 'Location field is required']
    },
    shop_name: {
        type: String,
        required: [true, 'Shop_name field is required']
    },
    about_us: {
        type: String,
        required: [true, 'About us field is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag field is required']
    },
    lat: {
        type: Number,
        default: 0.0
    },
    lon: {
        type: Number,
        default: 0.0
    },
    imageNum: {
        type: String,
        required: [true, 'Image Number field is required']
    },
    imageUrl: {
        type: [String],
        required: [true, 'Image URL field is required']
    },
    enroll_Date: {
        type: Date
    },
    rating: {
        type: Number,
        default: 0.0
    },
    total_visit: {
        type: Number,
        default: 0,
        required: [true, 'Total Visit field is required']
    }

});

// Collection 이름 지정
const Shop = mongoose.model('shop', ShopSchema);

module.exports = Shop;