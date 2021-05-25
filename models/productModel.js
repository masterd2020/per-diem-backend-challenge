const {Schema, model} = require("mongoose");

const productSchema = Schema({
  title: {
    type: String,
    required: [true, "Provide your product title"]
  },
  price: {
    type: Number,
    required: [true, "Provide your product price"]
  },
  description: {
    type: String,
    required: [true, "Provide your product description"]
  },
  productUrl: {
    type: String,
    required: [true, "Provide your product url"]
  },
  userId: {
    type: String,
    required: [true, "Provide your user id"]
  },
  storeId: {
    type: Schema.ObjectId,
    required: [true, "Provide your store id"]
  }
});

const Product = model("Product", productSchema);

module.exports = Product;