// General import
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Model import
const Schedule = require("../models/scheduleModel");

exports.prefillCreateBody = (req, res, next) => {
  const {productId} = req.query;
  
  // Pre-filling the request body
  req.body.userId = req.user._id;
  req.body.productId = productId;
  
  // Check for the existing of storeId in the query string
  if(!productId) {
    return next(new AppError("Provide the productId in the query string"));
  };
  next();
};



// Create Schedule
/*
  1= This is more like subscribing to a product
*/
exports.createSchedule = catchAsync(async (req, res, next) => {
  
  const schedule = await Schedule.create(req.body);
  
  res.status(201).json({
    status: "success",
    schedule
  });
});

// Get logged in user schedule(subscription)
exports.allMySchedules = catchAsync(async (req, res, next) => {
  
  const schedule = await Schedule.find({userId:req.user._id});
  
  res.status(200).json({
    status: "success",
    results: schedule.length,
    schedule
  });
});

// Get all Schedule
exports.getAllSchedules = catchAsync(async (req, res, next) => {
  
  const schedule = await Schedule.find();
  
  res.status(200).json({
    status: "success",
    results: schedule.length,
    schedule
  });
});

// Update schedule
exports.updateSchedule = catchAsync(async (req, res, next) => {
  
  const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true
  });
  
  if(!schedule) {
    return next(new AppError("No schedule found with that id"));
  }
  
  res.status(200).json({
    status: "success",
    schedule
  });
});

// Delete a schedule
exports.deleteSchedule = catchAsync(async (req, res, next) => {
  
  const schedule = await Schedule.findByIdAndDelete(req.params.id);
  
  if(!schedule) {
    return next(new AppError("No schedule found with that id"));
  }
  
  res.status(200).json({
    status: "success",
    schedule
  });
});
