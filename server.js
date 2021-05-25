const connect = require("./db/databaseConnection");
const app = require("./index");

// Database Connection
connect();

const port = process.env.PORT || 5000;

// starting the server
app.listen(port, () => {
  console.log(`Now Listening to port ${port}`);
});