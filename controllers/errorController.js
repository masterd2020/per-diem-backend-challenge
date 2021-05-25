/*
  1= Since we are still developing we need to know what's happening for better debugging experience.
*/
const sendErrorInDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack
  });
};

/*
  1= In production we don't want to send all the error details to our client, so that we won't be compromised.
  
  2= And also sending error that are trusted, i.e error handle and send by us.
  3= If any error that we didn't handle occur, in that case we will be sending a generic error message
  
*/
const sendErrorInProd = (err, res) => {
  if(err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
  
  console.log("💥", err);
  res.status(err.statusCode).json({
    status: err.status,
    message: "Something went wrong 😱, try again later!!!"
  });
};

// Using the express error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  
  if(process.env.NODE_ENV === "development") {
    console.log("error", err);
    sendErrorInDev(err, res);
  }
  
  if(process.env.NODE_ENV === "production") {
    sendErrorInProd(err, res);
  }
};