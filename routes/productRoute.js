const router = require("express").Router();

const { authenticate, authorize } = require ("../controllers/authController");
const { createProduct, getAllProducts, updateProduct, deleteProduct, allMyProducts, prefillCreateBody } = require ("../controllers/productController");

// All RESOURCES from this point are protected and has authorization
router.use(authenticate);

// Logged in merchant products
router.route("/my-products").get(authorize("merchant"), allMyProducts);

router
  .route("/")
// @Authorization: customer, admin only
  .get(authorize("admin", "customer"), getAllProducts)
// @Authorization: merchant only
  .post(authorize("merchant"), prefillCreateBody, createProduct);
  
router
  .route("/:id")
// @Authorization: merchant only
  .patch(authorize("merchant"), updateProduct)
// @Authorization: admin only
  .delete(authorize("admin"), deleteProduct);

module.exports = router;