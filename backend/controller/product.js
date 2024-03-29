const Product = require('../models/productSchema');
const AppError = require('../error handler/AppError');
const wrapAsync = require('../error handler/AsyncError');
const ApiFeatures = require('../utils/apiFeatures');
// to Create product

const createproduct = wrapAsync(async (req, res, next) => {
  console.log('hello world');
  console.log(req.rootUser);
  console.log('hello world');
  req.body.user = req.rootUser.id;
  let body = req.body;
  if (
    !req.body.user ||
    !body.name ||
    !body.desc ||
    !body.category ||
    !body.brand ||
    !body.seller ||
    !body.price
  ) {
    return next(new AppError('some of the input fields is missing', 404));
  }
  const product = new Product(req.body);
  const createproduct = await product.save();
  res.status(201).json({ success: true, message: createproduct });
});

// to read all the product
const readallproduct = wrapAsync(async (req, res) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const allproducts = await apiFeatures.query;
  // const allproducts = await Product.find();
  // console.log(allproducts);
  res.status(201).json({
    success: true,
    Total: productsCount,
    count: allproducts.length,
    message: allproducts,
  });
});

// to read  the product
const readsingleproduct = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.params._id);
  if (!product) {
    return next(new AppError('product not found', 404));
  }
  res.status(202).json({ success: true, message: product });
});

// to update the product
const updateproduct = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params._id);

  if (!product) {
    return next(new AppError('product not found', 404));
  }
  product = await Product.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, message: product });
});

// to delete product
const removeproduct = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params._id);
  if (!product) {
    return next(new AppError('product not found', 404));
  }
  product = await Product.findByIdAndDelete(req.params._id);
  res.status(200).json({ success: true, message: {} });
});

// create and Review
const createReview = wrapAsync(async (req, res, next) => {
  console.log(req.rootUser._id);

  const { rating, comment, productId } = req.body;

  const review = {
    userId: req.rootUser._id,
    name: req.rootUser.name,
    comment,
    rating,
  };

  let product = await Product.findById(req.params._id);
  if (!product) {
    return next(new AppError('product not found', 404));
  }

  const isReviewed = product.reviews.find(
    (ele) => ele.userId.toString() === req.rootUser._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((ele) => {
      if (ele.userId.toString() === req.rootUser._id.toString()) {
        ele.comment = comment;
        ele.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numreview = product.reviews.length;
  }
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  product = await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, message: product });
});

// get all review of single product
const allReview = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params._id);
  if (!product) {
    return next(new AppError('product not found', 404));
  }

  res.status(200).json({ success: true, message: product.reviews });
});

// get delete review of single product
const deleteReview = wrapAsync(async (req, res, next) => {
  if (!req.query.userId) {
    return next(new AppError('please enter user id', 404));
  }

  let product = await Product.findById(req.params._id);
  if (!product) {
    return next(new AppError('product not found', 404));
  }

  const reviews = product.reviews.filter(
    (ele) => ele.userId.toString() !== req.query.userId.toString()
  );

  const numOfReviews = reviews.length;
  let rating =
    reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  if (!rating) {
    rating = 0;
  }

  product = await Product.findByIdAndUpdate(
    req.params._id,
    {
      reviews,
      numreview: numOfReviews,
      rating,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({ success: true, message: product });
});

module.exports = {
  createproduct,
  readallproduct,
  readsingleproduct,
  removeproduct,
  updateproduct,
  createReview,
  allReview,
  deleteReview,
};
