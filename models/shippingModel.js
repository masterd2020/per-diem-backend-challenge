const {Schema, model} = require("mongoose");

const shippingSchema = Schema({
  pickup: {
    type: Boolean,
    default: true
  },
  pickupAddress: String,
  shippingAddress: String,
  fulfillmentName: String,
  fulfillmentCost: Number,
  productId: {
    type: Schema.ObjectId,
    required: [true, "Provide the product id to subscribe to"]
  },
  scheduleId: {
    type: Schema.ObjectId,
    required: [true, "Provide the schedule id"]
  },
  userId: {
    type: Schema.ObjectId,
    required: [true, "Provide the user id"]
  }
});

const Shipping = model("Shipping", shippingSchema);

module.exports = Shipping;