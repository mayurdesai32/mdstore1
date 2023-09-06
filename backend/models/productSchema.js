const mongoose = require('mongoose');
const AppError = require('../error handler/AppError');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
    trim: true,

    minLength: [3, 'minimum char length should greater than 3'],
    maxLength: [30, 'maximum char length should less than 20'],
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['mens', 'ladies', 'electronics', 'unknown'],
      message: 'please select correct category',
    },
  },
  image: [
    {
      publicid: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  price: {
    type: Number,
    required: [true, 'please enter price'],
    validate(value) {
      if (value < 0) {
        //  Errow('value count is -ve');
        throw new AppError('price value is -ve', 404);
      } else if (value > 500000) {
        //  Errow('value count more than 5 ');
        throw new AppError('price value cannot be greater than 500000', 404);
      }
    },
  },
  desc: { type: String, required: [true, 'please enter desc'] },
  rating: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        //  Errow('value count is -ve');
        throw new AppError('value count is -ve', 404);
      }
    },
  },
  brand: { type: String, required: [true, 'please enter brand'] },
  stock: {
    type: Number,
    required: [true, 'please enter product stock'],
    default: 0,
    validate(value) {
      if (value < 0 || value > 200) {
        //  Errow('value count is -ve');
        throw new AppError(
          'product stock value  is -ve or value greater than 200',
          404
        );
      }
    },
  },
  numreview: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = new mongoose.model('Product', productSchema);
module.exports = Product;
