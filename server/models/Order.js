const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  baseItem: String,
  price: Number,
  quantity: Number,
  side: String,
  drink: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true
},
  cart: {
    type: [cartItemSchema],
    required : true,
    validate: [arr => arr.length > 0, 'Cart cannot be empty']
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
  type: String,
  enum: ["pending", "preparing", "completed", "cancelled"],
  default: "pending"
},
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);
