const Skill = require("../models/skills.model.js");

// Get all skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single skill
const getSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create skill
const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update skill
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndUpdate(id, req.body);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    const updatedSkill = await Skill.findById(id);
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete skill
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill
};
