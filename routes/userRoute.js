const express = require("express");

const { login, register, authenticate, authorize } = require ("../controllers/authController");
const { getAllUsers, deleteUser } = require ("../controllers/userController");

const router = express.Router();

// User Authentication
router.route("/register").post(register);
router.route("/login").post(login);

// All RESOURCES from this point are protected and has authorization
// @Authorization: admin only
router.use(authenticate, authorize("admin"));

router
  .route("/")
  .get(getAllUsers);
  
router
  .route("/:id")
  .delete(deleteUser);
  
 module.exports = router;