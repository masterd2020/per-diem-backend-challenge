const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const storeSchema = Schema({
  storeName: {
    type: String,
    required: [true, "Please provide your store name"]
  },
  slug: {
    type: String,
    unique: true
  },
  userId: {
    type: Schema.ObjectId,
    requires: [true, "Please the user id"]
  }
});

storeSchema.pre("save", function (next) {
  this.slug = slugify(this.storeName, {lower: true});
  next();
});

const Store = model("Store", storeSchema);

module.exports = Store;