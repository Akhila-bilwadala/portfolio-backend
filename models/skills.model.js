const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", SkillsSchema);
