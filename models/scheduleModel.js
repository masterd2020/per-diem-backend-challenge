const {Schema, model} = require("mongoose");

const scheduleSchema = Schema({
  startDate: Date,
  endDate: Date,
  duration: {
    type: String,
    required: [true, "Provide your subscription duration"]
  },
  interval: {
    type: String,
    required: [true, "Provide your subscription interval"]
  },
  scheduleDate: String,
  productId: {
    type: Schema.ObjectId,
    required: [true, "Provide the product id to subscribe to"]
  },
  userId: {
    type: Schema.ObjectId,
    required: [true, "Provide the user id"]
  }
});

const Schedule = model("Schedule", scheduleSchema);

module.exports = Schedule;