/*
  extending the error class and then adding some more properties.
  
  for easy error logging in the application
*/

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  };
};

module.exports = AppError;