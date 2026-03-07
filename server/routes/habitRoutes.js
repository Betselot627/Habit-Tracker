const express = require("express");
const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleComplete,
} = require("../controllers/habitController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getHabits);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.post("/:id/toggle", toggleComplete);

module.exports = router;
