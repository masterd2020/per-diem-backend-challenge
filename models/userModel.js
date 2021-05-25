const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your firstName"]
  },
  lastName: {
    type: String,
    required: [true, "Please provide your lastName"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide your password confirm"],
    validate: {
      validator: function(value) {
        return this.password === value;
      },
      message: "The password doesn't match"
    }
  },
  role: {
    type: String,
    default: "customer",
    enum: {
      values: ["admin", "merchant", "customer"],
      message: "Please provide only (admin, merchant and customer)"
    }
  }
});

// Hashing the password before saving to the database
userSchema.pre("save", async function(next) {
  
  if(!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Will either return true or false if the password matches
userSchema.methods.correctPassword = async function(supplyPassword, userPassword) {
  return await bcrypt.compare(supplyPassword, userPassword);
};

const User = model("User", userSchema);

module.exports = User;