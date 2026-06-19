const mongoose = require("mongoose");


const cartItemSchema = new mongoose.Schema({
  cartItemId: { type: String, required: true }, // unique id for item + options
  baseItem: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String }
  },
  options: {
    side: { type: String, default: '' },
    sauce: { type: String, default: '' },
    drink: { type: String, default: '' }
  },
  quantity: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true, min: 0 }
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
    required: true,
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
