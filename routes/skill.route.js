const express = require("express");
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill
} = require("../controllers/skill.controller.js");

const router = express.Router();

const { protect } = require('../middleware/auth.middleware');

// Routes
router.get("/", getSkills);
router.get("/:id", getSkill);
router.post("/", protect, createSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
