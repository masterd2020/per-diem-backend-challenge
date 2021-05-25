const request = require("supertest");
const mongoose = require("mongoose");

// Express app
const app = require("../");

// User Model
const User = require("../models/userModel");
const Store = require("../models/storeModel");

// auth
let auth = {};

beforeEach(async (done) => {
  try {
  	await mongoose.connect(process.env.TEST_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log("Database connection successful");
      await User.deleteMany();
      await Store.deleteMany();
      console.log("All datas successful deleted");
      done()
  } catch (e) {
    console.log(e);
    done(e)
  }
});

describe("POST /users/register", () => {
  test("create new users", () =>{
    request(app)
    .post("/users/register")
    .send({
      firstName: 'Toheeb',
      lastName: 'Fasasi',
      email: 'customer@perdiem.com',
      role: "admin",
      password:"pass1234",
      passwordConfirm:"pass1234"
    })
    .expect(201)
    .then((res) => {
      expect(res.body.status).toBe("success");
    })
    .catch((err) => console.log("err",err))
  });
});

describe("POST /users/login", () => {
  test("login user", () => {
    request(app)
      .post("/users/login")
      .send({
        email: "admin@perdiem.co",
        password: "pass1234"
      })
      .then((res) => {
        auth.token = res.token;
        auth.user = user;
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
      })
      .catch((err) => console.log(err));
  });
});
