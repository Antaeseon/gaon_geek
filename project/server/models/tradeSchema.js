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
    },
    borrow_date:{
        type:Date,
    },
    return_date:{
        type:Date
    },
    is_buy:{
        type:Boolean
    },
    trade_method:{ //구매일땐 buy 빌릴땐 borrow
        type:String
    },
    trade_status:{ // 0일때는 대여 전 1일때는 대여중 2일때는 거래 종료
        type:Number,
        default:0
    }
})

const trade = mongoose.model('trade', tradeSchema);
module.exports = trade;