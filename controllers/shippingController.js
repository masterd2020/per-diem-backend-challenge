// General import
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Model import
const Shipping = require("../models/shippingModel");

exports.prefillCreateBody = (req, res, next) => {
  const {productId, scheduleId} = req.query;
  
  // Pre-filling the request body
  req.body.userId = req.user._id;
  req.body.productId = productId;
  req.body.scheduleId = scheduleId;
  
  // Check for the existing of storeId in the query string
  if(!productId) {
    return next(new AppError("Provide the productId in the query string"));
  };
  next();
};



// Create shipping
exports.createShipping = catchAsync(async (req, res, next) => {
  
  const shipping = await Shipping.create(req.body);
  
  res.status(201).json({
    status: "success",
    shipping
  });
});

// Get logged in user shipping
exports.allMyShippings = catchAsync(async (req, res, next) => {
  
  const shipping = await Shipping.find({userId:req.user._id});
  
  res.status(200).json({
    status: "success",
    results: shipping.length,
    shipping
  });
});

// Get all Shipping
exports.getAllShippings = catchAsync(async (req, res, next) => {
  
  const shipping = await Shipping.find();
  
  res.status(200).json({
    status: "success",
    results: shipping.length,
    shipping
  });
});

// Update shipping
exports.updateShipping = catchAsync(async (req, res, next) => {
  
  const shipping = await Shipping.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true
  });
  
  if(!shipping) {
    return next(new AppError("No shipping found with that id"));
  }
  
  res.status(200).json({
    status: "success",
    shipping
  });
});

// Delete a shipping
exports.deleteShipping = catchAsync(async (req, res, next) => {
  
  const shipping = await Shipping.findByIdAndDelete(req.params.id);
  
  if(!shipping) {
    return next(new AppError("No shipping found with that id"));
  }
  
  res.status(200).json({
    status: "success",
    shipping
  });
});
