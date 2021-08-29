const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      _id: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: Number, required: true },
    country: { type: String, required: true },
  },
  orderAmount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  isDelivered: { type: Boolean, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order;
