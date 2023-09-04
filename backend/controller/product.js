const Product = require('../models/productSchema');
const AppError = require('../error handler/AppError');
const wrapAsync = require('../error handler/AsyncError');
const ApiFeatures = require('../utils/apiFeatures');
// to Create product

const createproduct = wrapAsync(async (req, res, next) => {
  req.body.user = req.rootuser.id;
  const product = new Product(req.body);
  const createproduct = await product.save();
  res.status(201).json({ success: true, message: createproduct });
});

// to read all the product
const readallproduct = wrapAsync(async (req, res) => {
  console.log('hello world');
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const allproducts = await apiFeatures.query;
  // const allproducts = await Product.find();
  // console.log(allproducts);
  res
    .status(201)
    .json({ success: true, count: allproducts.length, message: allproducts });
});

// to read  the product
const readsingleproduct = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    next(new AppError('product not found', 404));
  } else {
    res.status(202).json({ success: true, message: product });
  }
});

// to update the product
const updateproduct = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    next(new AppError('product not found', 404));
  } else {
    const product = await Product.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, message: product });
  }
});

// to delete product
const removeproduct = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    next(new AppError('product not found', 404));
  } else {
    product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: {} });
  }
});

module.exports = {
  createproduct,
  readallproduct,
  readsingleproduct,
  removeproduct,
  updateproduct,
};
