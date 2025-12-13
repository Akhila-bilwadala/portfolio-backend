const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true,
  }
);

// Create case-insensitive unique index
SkillsSchema.index({ skill: 1 }, {
  unique: true,
  collation: { locale: 'en', strength: 2 }
});

module.exports = mongoose.model("Skill", SkillsSchema);
