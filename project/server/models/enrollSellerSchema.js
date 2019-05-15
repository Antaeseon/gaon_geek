const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model
const enrollSellerSchema = new Schema({
    id: {
        type: String,
        required: [true, 'User id field is required'],
        unique: true
    },
    shop_name: {
        type: String,
        required: [true, 'Shop Name field is required']
    },
    location: {
        type: String,
        required: [true, 'Location field is required']
    },
    nation: {
        type: String,
        required: [true, 'Nation field is required']
    },
    about_us: {
        type: String,
        required: [true, 'About us field is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag field is required']
    },
    imageNum: {
        type: String,
        required: [true, 'Image Number field is required']
    },
    lat: {
        type: Number,
        default: 0.0
    },
    lon: {
        type: Number,
        default: 0.0
    },
    imageUrl: {
        type: [String],
        required: [true, 'Image URL field is required']
    }

});

// Collection 이름 지정
const enrollSeller = mongoose.model('enrollSeller', enrollSellerSchema);

module.exports = enrollSeller;