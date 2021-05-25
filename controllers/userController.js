// General import
const catchAsync = require("../utils/catchAsync");

// Model import
const User = require("../models/userModel");

// Endpoint for getting all the users in the database
exports.getAllUsers = catchAsync(async (req, res, next) => {
  
  const user = await User.find();
  
  res.status(200).json({
    status: "success",
    user
  });
});

// Deleting of user
exports.deleteUser = catchAsync(async (req, res, next) => {
  
  const user = await User.findByIdAndDelete(req.params.id);
  
  res.status(200).json({
    status: "success",
    user
  });
});



/*
exports.getAllWord = catchAsync(async (req, res, next) => {
  
  res.send({});
});

exports.createWord = catchAsync(async (req, res, next) => {
  
  res.send({});
});

exports.getWord = catchAsync(async (req, res, next) => {
  
  res.send({});
});

exports.updateWord = catchAsync(async (req, res, next) => {
  
  res.send({});
});

exports.deleteWord = catchAsync(async (req, res, next) => {
  
  res.send({});
});*/