// General import
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Model import
const Product = require("../models/productModel");

/*
  1= Setting storeId and userId using this middleware before reaching the main create product middleware
*/
exports.prefillCreateBody = (req, res, next) => {
  const {storeId} = req.query;
  
  // Pre-filling the request body
  req.body.userId = req.user._id;
  req.body.storeId = storeId;
  
  // Check for the existing of storeId in the query string
  if(!storeId) {
    return next(new AppError("Provide the storeId in the query string"));
  };
  next();
};

// Create store
exports.createProduct = catchAsync(async (req, res, next) => {
  
  const product = await Product.create(req.body);
  
  res.status(201).json({
    status: "success",
    product
  });
});

// Get logged in user store
exports.allMyProducts = catchAsync(async (req, res, next) => {
  
  const product = await Product.find({userId:req.user._id});
  
  res.status(200).json({
    status: "success",
    results: product.length,
    product
  });
});

// Get all product
exports.getAllProducts = catchAsync(async (req, res, next) => {
  
  const product = await Product.find();
  
  res.status(200).json({
    status: "success",
    results: product.length,
    product
  });
});

// Update product
exports.updateProduct = catchAsync(async (req, res, next) => {
  
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true
  });
  
  if(!product) {
    return next(new AppError("No product found with that id"));
  }
  
  res.status(200).json({
    status: "success",
    product
  });
});

// Delete a product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  
  const product = await Product.findByIdAndDelete(req.params.id);
  
  if(!product) {
    return next(new AppError("No product found with that id"));
  }
  
  res.status(200).json({
    status: "success",
    product
  });
});
