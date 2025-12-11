const express = require('express');
const router = express.Router();

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/project.controller');

const { protect } = require('../middleware/auth.middleware');

// Routes
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
