const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter project name"],
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    demo: {
      type: String,
      required: false,
    },
    tech: {
      type: [String],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

// ✅ YOU FORGOT THIS PART
module.exports = mongoose.model("Project", ProjectSchema);
