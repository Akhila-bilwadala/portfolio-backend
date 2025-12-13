const express = require('express');
const router = express.Router();

const {
    createMessage,
    getMessages,
    deleteMessage
} = require('../controllers/message.controller');

const { protect } = require('../middleware/auth.middleware');

// POST "/" -> Create message (Public - anyone can send messages)
router.post('/', createMessage);

// GET "/" -> Get all messages (Admin only - requires authentication)
router.get('/', protect, getMessages);

// DELETE "/:id" -> Delete message (Admin only - requires authentication)
router.delete('/:id', protect, deleteMessage);

module.exports = router;
