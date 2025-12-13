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
      validate: {
        validator: function (v) {
          // Allow empty string or null
          if (!v) return true;
          // Validate GitHub URL format
          return /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?.*$/i.test(v);
        },
        message: 'Please provide a valid GitHub URL (e.g., https://github.com/username/repo)'
      },
      trim: true
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


module.exports = mongoose.model("Project", ProjectSchema);
