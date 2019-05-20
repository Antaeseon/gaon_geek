const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema= new Schema({
    buyer_id: {
        type: String,
        required: [true, 'Buyer_id field is required'],
        unique: true
    },
    seller_id: {
        type: String,
        required: [true, 'Seller_id field is required'],
        unique: true
    }, 
    item_id: {
        type: String,
        required: [true, 'Item_id field is required'],
        unique: true
    }
})


const trade = mongoose.model('trade', tradeSchema);

module.exports = trade;