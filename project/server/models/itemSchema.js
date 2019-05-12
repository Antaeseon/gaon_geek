const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model
const ItemSchema = new Schema({
    id: {
        type: String,
        required: [true, 'User id(Shop id) field is required'],
        unique: true
    },
    item_name: {
        type: String,
        required: [true, 'Item Name field is required']
    },
    brand: {
        type: String,
        required: [true, 'Brand field is required']
    },
    color: {
        type: String,
        required: [true, 'Color field is required']
    },
    category: {
        type: String,
        required: [true, 'Category field is required']
    },
    detail: {
        type: String,
        required: [true, 'Detail field is required']
    },
    precautions: {
        type: String,
        required: [true, 'Precautions field is required']
    },
    price: {
        type: Number,
        required: [true, 'Price field is required']
    },
    size: {
        type: String,
        required: [true, 'Size field is required']
    },
    picture: {
        type: [String],
        required: [true, 'Image URL field is required']
    },
    certificate: {
        type: String,
        required: [true, 'Certificate field is required']
    },
    status: {
        type: Number,
        default: 0
    }
});

// Collection 이름 지정
const Item = mongoose.model('item', ItemSchema);

module.exports = Item;