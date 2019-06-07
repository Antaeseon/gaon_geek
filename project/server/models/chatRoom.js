const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema({
  'buyer_id' : String,
  'seller_id' : String,
})

module.exports = mongoose.model('chatRoom',chatSchema);
