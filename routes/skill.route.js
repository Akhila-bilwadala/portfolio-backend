const express = require("express");
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill
} = require("../controllers/skill.controller.js");

const router = express.Router();

// Routes
router.get("/", getSkills);
router.get("/:id", getSkill);
router.post("/", createSkill);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;
