const express = require("express");
const router = express.Router();
const {
  getGoals,
  deleteGoal,
  updateGoals,
  setGoals,
  getSingleGoal,
} = require("../controllers/goalControllers");
const { protect } = require("../Middleware/authMiddleWare");
router.get("/",protect, getGoals);

router.post("/",protect,setGoals);

router.put("/:id", updateGoals);
router.get("/:id", getSingleGoal);
router.delete("/:id",protect, deleteGoal);
module.exports = router;
