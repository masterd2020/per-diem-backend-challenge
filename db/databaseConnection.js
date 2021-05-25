const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Database Connection Successful");
  } catch (e) {
    console.log("Error 💥 ", e);
  }
};

module.exports = connect;