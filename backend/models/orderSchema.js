const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: { type: String, required: true },
      image: { type: String, required: true },
      quantity: {
        type: Number,
        required: true,
        minLength: [1, 'Your  quantity no should not be less than 1 char'],
      },

      price: { type: Number, required: true },
    },
  ],
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNo: {
      type: Number,
      required: true,
      minLength: [10, 'Your  phone no should not be less than 10 char'],
      maxLength: [10, 'Your phone no should not be more than 10 char'],
    },
    pinCode: {
      type: Number,
      required: true,
      minLength: [6, 'Your  pinCode no should not be less than 6 char'],
      maxLength: [6, 'Your pinCode no should not be more than 6 char'],
    },
    country: { type: String, required: true },
  },
  PaymentInfo: {
    id: { type: String },
    status: {
      type: String,
    },
  },
  paidAt: { type: Date, required: true },
  itemsPrice: { type: Number, required: true, default: 0.0 },
  taxPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },
  orderStatus: {
    type: String,
    required: true,
    default: 'Processing',
    enum: {
      values: ['Processing', 'Delivered'],
      message: 'please select correct orderStatus',
    },
  },
  deliveredAt: { type: Date },
  // transactionId: { type: String, required: true },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order;
