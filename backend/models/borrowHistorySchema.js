const mongoose = require('mongoose')
const Schema = mongoose.Schema

const borrowHistorySchema = new Schema({
  
    user_id: {
      type:Schema.Types.ObjectId,
      ref:'user'
    },
    book_id: [{
          type:Schema.Types.ObjectId,
          ref:'book'
      }]
    ,
    booking_date: {
      type: Date,
      default: Date.now
    },
    return_date: {
      type: Date,
      default: null
    }
  });
  
  module.exports = mongoose.model('borrowhistory', borrowHistorySchema);