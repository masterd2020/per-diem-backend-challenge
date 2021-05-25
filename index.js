const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// general import
const globalErrorHandling = require("./controllers/errorController");
const AppError = require("./utils/appError");
//const connect = require("./db/databaseConnection");

// Route import
const userRoute = require("./routes/userRoute");
const storeRoute = require("./routes/storeRoute");
const productRoute = require("./routes/productRoute");
const scheduleRoute = require("./routes/scheduleRoute");
const shippingRoute = require("./routes/shippingRoute");


// Express app
const app = express();


// Trust proxy
app.enable("trust proxy");

// Parsing incoming body data
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(cors());

// Logging Middleware
if(process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// setting Http Header
app.use(helmet());

// sanitizing user inputs
app.use(mongoSanitize());

// preventing against xss attack
app.use(xss());

// Testing Middleware
app.use((req, res, next) => {
  next();
});

// Mounting routes
app.use("/users", userRoute);
app.use("/stores", storeRoute);
app.use("/products", productRoute);
app.use("/schedules", scheduleRoute);
app.use("/shippings", shippingRoute);


// 404 Not Found
app.all("*", (req, res, next) => {
  const message = `${req.originalUrl} doesn't exist on this server`;
  next(new AppError(message, 400));
});

// Mounting Express Global Error handling middleware => for sending error when pass to the next() function
app.use(globalErrorHandling);

// Exporting the entire express app.
module.exports = app;