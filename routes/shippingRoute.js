const router = require("express").Router();

const { authenticate, authorize } = require ("../controllers/authController");
const { createShipping, getAllShippings, updateShipping, deleteShipping, allMyShippings, shippingDelivered, prefillCreateBody } = require ("../controllers/shippingController");

// All RESOURCES from this point are protected and has authorization
router.use(authenticate);

// Logged in customer shippings
router.route("/my-shippings").get(authorize("customer"), allMyShippings);

router
  .route("/")
// @Authorization: merchant and admin only
  .get(authorize("admin", "merchant"), getAllShippings)
// @Authorization: customer only
  .post(authorize("customer"), prefillCreateBody, createShipping);
  
router
  .route("/:id")
// @Authorization: customer only
  .patch(authorize("customer"), updateShipping)
// @Authorization: admin only
  .delete(authorize("admin"), deleteShipping);

module.exports = router;