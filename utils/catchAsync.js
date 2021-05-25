// Used to remove the ugly try and catch block, and taking advantage of express next() middleware

const catchAsync =(fn) =>  {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = catchAsync;