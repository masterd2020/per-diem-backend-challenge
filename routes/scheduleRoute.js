const router = require("express").Router();

const { authenticate, authorize } = require ("../controllers/authController");
const { createSchedule, getAllSchedules, updateSchedule, deleteSchedule, allMySchedules, prefillCreateBody } = require ("../controllers/scheduleController");

// All RESOURCES from this point are protected and has authorization
router.use(authenticate);

// Logged in customer schedules
router.route("/my-schedules").get(authorize("customer"), allMySchedules);

/*
  1= it make sense to give customers permission to create a schedule because i think this schedule model is all about the customer subscribing to a product and so on.
*/
router
  .route("/")
// @Authorization: merchant and admin only
  .get(authorize("admin", "merchant"), getAllSchedules)
// @Authorization: customer only
  .post(authorize("customer"), prefillCreateBody, createSchedule);
  
router
  .route("/:id")
// @Authorization: customer only
  .patch(authorize("customer"), updateSchedule)
// @Authorization: admin only
  .delete(authorize("admin"), deleteSchedule);

module.exports = router;