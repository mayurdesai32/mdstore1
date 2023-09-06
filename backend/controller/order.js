const { v4: uuidv4 } = require('uuid');
// const uuid = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderSchema');
const AppError = require('../error handler/AppError');
const wrapAsync = require('../error handler/AsyncError');
const Product = require('../models/productSchema');
// to place an order
const newOrder = wrapAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    PaymentInfo,
    email,
    name,
  } = req.body;

  // if (
  //   !orderItems ||
  //   !shippingInfo ||
  //   !itemsPrice ||
  //   !taxPrice ||
  //   !shippingPrice ||
  //   !totalPrice ||
  //   !PaymentInfo
  // ) {
  //   return next(new AppError('some of the input fields is missing', 401));
  // }

  const order = new Order({
    name,
    email,
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    PaymentInfo,
    paidAt: Date.now(),
    userid: req.rootUser._id,
  });
  const createOrder = await order.save();
  res.status(201).json({ success: true, message: createOrder });
});

const getSingleOrder = wrapAsync(async (req, res, next) => {
  const order = await Order.findById(req.params._id).populate(
    'userid',
    'name email'
  );

  if (!order) {
    new AppError(`No order found with this id ${req.params._id}`, 404);
  }
  res.status(201).json({ success: true, message: order });
});

const loginUserOrder = wrapAsync(async (req, res, next) => {
  const orders = await Order.find({ userid: req.rootUser._id });

  res.status(201).json({ success: true, message: orders });
});

// admin
const allOrder = wrapAsync(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((ele) => {
    totalAmount += ele.totalPrice;
  });

  res.status(201).json({ success: true, totalAmount, message: orders });
});

// admin
const updateOrder = wrapAsync(async (req, res, next) => {
  if (!req.body.status) {
    return next(new AppError('some of the input fields is missing', 401));
  }

  let order = await Order.findById(req.params._id);
  if (!order) {
    return next(
      new AppError(`No order found with this id ${req.params._id}`, 401)
    );
  }

  if (order.orderStatus === 'Delivered') {
    return next(
      new AppError(
        `order has already been Delivered so you cant change the o  rder detail `,
        401
      )
    );
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.productId, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  order = await order.save();
  res.status(201).json({ success: true, message: order });
});

// admin
const deleteOrder = wrapAsync(async (req, res, next) => {
  const order = await Order.findById(req.params._id);

  if (!order) {
    return next(
      new AppError(`No order found with this id ${req.params._id}`, 404)
    );
  }

  await order.remove();
  res.status(201).json({ success: true, message: 'order deleted' });
});

const placeOrder = wrapAsync(async (req, res, next) => {
  const { token, cartItems, currentUser, subtotal } = req.body;

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
  newOrder,
  getSingleOrder,
  loginUserOrder,
  placeOrder,
  sendStripApi,
  allOrder,
  updateOrder,
  deleteOrder,
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save();
}
