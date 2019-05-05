const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user Schema & model
const UserSchema = new Schema({
    id: {
        type: String,
        required: [true, 'User id field is required'],
        unique: true
    },
    pwd: {
        type: String,
        required: [true, 'Password field is required']
    },
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    nation: {
        type: String,
        required: [true, 'Nation field is required']
    },
    phoneNum: {
        type: String,
        required: [true, 'Phone Number field is required']
    },
    email: {
        type: String,
        required: [true, 'User email is required']
    },
    signup_Date: {
        type: Date
    },
    point: {
        type: Number,
        default: 0
    },
    isSeller: {
        type: Boolean,
        default: false
    }

});
UserSchema.statics.findOneById = function(id) {
    return this.findOne({
      id
    }).exec();
  };
  
  UserSchema.methods.verify = function(pwd) {
    return this.pwd == pwd;
  };
  
  UserSchema.methods.assignAdmin = function() {
    this.admin = true;
    return this.save();
  };
  
// Collection 이름 지정
const User = mongoose.model('user', UserSchema);

module.exports = User;