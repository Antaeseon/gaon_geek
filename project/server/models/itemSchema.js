const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model!
const ItemSchema = new Schema({
    shop_id: {
        type: String,
        required: [true, 'User id(Shop id) field is required'],
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
    size: {
        type: String,
        required: [true, 'Size field is required']
    },
    tag: {
        type: [String],
        required: [true, 'Tag field is required']
    },
    detail: {
        type: String,
        required: [true, 'Detail field is required']
    },
    state: {
        type: String,
        required: [true, 'State field is required']
    },
    material: {
        type: String,
        required: [true, 'Material field is required']
    },
    price: {
        type: Number,
        required: [true, 'Price field is required']
    },
    rental: {
        type: Number,
        required: [true, 'Rental field is required']
    },
    status: { //0일때는 재고에 있음 1일때는 대여중 2일때는 구매
        type: Number,
        default: 0
    },
    imageNum: {
        type: Number,
        required: [true, 'image Number field is required']
    },
    imageUrl: {
        type: [String],
        required: [true, 'Image URL field is required']
    },
    certificateUrl: {
        type: String,
        required: [true, 'Certificate field is required']
    }
});

// Collection 이름 지정
const Item = mongoose.model('item', ItemSchema);

module.exports = Item;