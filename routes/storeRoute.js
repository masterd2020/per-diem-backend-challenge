const router = require("express").Router();

const { authenticate, authorize } = require ("../controllers/authController");
const { createStore, getAllStores, updateStore, deleteStore, allMyStore } = require ("../controllers/storeController");

// All RESOURCES from this point are protected and has authorization
router.use(authenticate);

// Logged in user stores
router.route("/my-stores").get(authorize("merchant"), allMyStore);

router
  .route("/")
  // @Authorization: admin and customer only
  .get(authorize("admin", "customer"), getAllStores)
  // @Authorization: merchant only
  .post(authorize("merchant"), createStore);
  
router
  .route("/:id")
  // @Authorization: merchant only
  .patch(authorize("merchant"), updateStore)
  // @Authorization: admin only
  .delete(authorize("admin"), deleteStore);

module.exports = router;