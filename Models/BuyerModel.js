const mongoose = require('mongoose');

const buyersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  isSlotBooked: {
    type: String,
    default: 'notBooked'
  }
})

const Buyers = mongoose.model('Buyers', buyersSchema);
module.exports = Buyers