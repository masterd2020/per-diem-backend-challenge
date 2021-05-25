// General import
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


// Model import
const Store = require("../models/storeModel");

// Create store
exports.createStore = catchAsync(async (req, res, next) => {
  // Loggged in user
  req.body.userId = req.user._id;
  
  const store = await Store.create(req.body);
  
  res.status(201).json({
    status: "success",
    store
  });
});

// Get logged in user store
exports.allMyStore = catchAsync(async (req, res, next) => {
  
  const store = await Store.find({userId:req.user._id});
  
  res.status(200).json({
    status: "success",
    results: store.length,
    store
  });
});

// Get all store
exports.getAllStores = catchAsync(async (req, res, next) => {
  
  const store = await Store.find();
  
  res.status(200).json({
    status: "success",
    results: store.length,
    store
  });
});

// Update store
exports.updateStore = catchAsync(async (req, res, next) => {
  
  const store = await Store.findById(req.params.id);
  
  if(!store) {
    return next(new AppError("No store found with that id"))
  }
  
  store.storeName = req.body.storeName;
  await store.save();
  
  res.status(200).json({
    status: "success",
    store
  });
});

// Delete a store
exports.deleteStore = catchAsync(async (req, res, next) => {
  
  const store = await Store.findByIdAndDelete(req.params.id);
  
  if(!store) {
    return next(new AppError("No store found with that id"))
  }
  
  res.status(200).json({
    status: "success",
    store
  });
});
