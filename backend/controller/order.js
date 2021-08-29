const { v4: uuidv4 } = require('uuid');
// const uuid = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderSchema');
const AppError = require('../error handler/AppError');
const wrapAsync = require('../error handler/AsyncError');

// to place an order
const placeOrder = wrapAsync(async (req, res, next) => {
  console.log('hello');
  const { token, cartItems, currentUser, subtotal } = req.body;
  console.log(subtotal);
  console.log('hello');
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });
  console.log('hello12');
  console.log(token);
  const payment = await stripe.charges.create(
    {
      amount: subtotal,
      currency: 'inr',
      customer: customer.id,
      receipt_email: token.email,
    },
    {
      idempotencyKey: uuidv4(),
    }
  );
  console.log('hello45');
  if (payment) {
    const order = new Order({
      userid: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      orderItems: cartItems,
      shippingAddress: {
        address: token.card.address_line1,
        city: token.card.address_city,
        country: token.card.address_country,
        postalCode: token.card.address_zip,
      },
      orderAmount: subtotal,
      transactionId: payment.source.id,
      isDelivered: false,
    });
    console.log('hello78');
    const createOrder = await order.save();
    res.status(201).json({ success: true, message: createOrder });
  }
});

const sendStripApi = wrapAsync(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY_KEY,
  });
});
module.exports = {
  placeOrder,
  sendStripApi,
};
