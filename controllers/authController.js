const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// General import
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Model import
const User = require("../models/userModel");

// Signing a token
const signToken = ({_id}, res) => {
  // Generating jwt token
  const token =  jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  
  // Creating an httpOnly cookie 
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  
  // Sending cookie
  res.cookie("token", token, cookieOptions);
  
  return token;
};

// Register user
exports.register = catchAsync(async (req, res, next) => {
  /*
  @NOTE
  
    1= The code snippet below is commented out, but in real world we won't allow users to make themselves an admin
  */
  // Making sure users are not able to make themselves admin
  /*if(req.body.role === "admin") {
    req.body.role = "customer";
  }*/
  const user = await User.create(req.body);
  
  // Signing a jwt token
  const token = signToken(user, res);
  
  // Removig the user password from the output
  user.password = undefined;
  
  res.status(201).json({
    status: "success",
    user,
    token
  });
});

// Login user
exports.login = catchAsync(async (req, res, next) => {
  const {email, password} = req.body;
  // 1= Check if we have the email and password field
  if(!email || !password) {
    return next(new AppError("provide the email and password field", 400));
  }
  
  // 2= check if the user exist in the database and the password exist
  const userConfirm = await User.findOne({ email }).select("+password");
  
  // Calling the correctPassword method on the model
  if(!userConfirm || !(await userConfirm.correctPassword(password, userConfirm.password))) {
    return next(new AppError("Incorrect email or password"), 401);
  }
  
  const token = signToken(userConfirm, res, req);
  
  // Removing the user password from the output
  userConfirm.password = undefined;
  
  res.status(200).json({
    status: "success",
    user: userConfirm,
    token
  });
});


// Gaining access to protected endpoint
/*
  1= This authenticate function is just like a middleware which will run within the request and response licycle.
*/
exports.authenticate = catchAsync(async (req, res, next) => {
  let token;
  
  // 1= Check if the token is in the header OR Check it in the request token
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if(req.cookies.token) {
    token = req.cookies.token;
  }
  
  // No token, send error message
  if(!token) {
    return next(new AppError("Unauthorized, logged in again!!!", 401));
  }
  
  // 2= Verification of token
  /*
    1= Using the promisify method so as to avoid passing callback to the jwt.verify method
  */
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  // 3= Check if the user exist in the database
  const userExist = await User.findById(decode._id);
  
  // Checking for the existence of the user that owns the token
  if(!userExist) {
    return next(new AppError("This user doesn't exist in the anymore", 401));
  }
  
  // GRANT ACCESS TO PROCTECTED ROUTE
  req.user = userExist;
  next();
});

/*
@params:
  array of roles
  
  1= if the array of roles we provided doesn't include the currently logged in user, then don't grant them access. 
*/
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) return next(new AppError("You are not allowed to use this resource, please contact support!!!", 403));
    
    next();
  };
};