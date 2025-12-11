const express = require('express');
const router = express.Router();

const {
    createMessage,
    getMessages,
    deleteMessage
} = require('../controllers/message.controller');

// POST "/" -> Create message (Public)
router.post('/', createMessage);

// GET "/" -> Get all messages (Admin)
router.get('/', getMessages);

// DELETE "/:id" -> Delete message (Admin)
router.delete('/:id', deleteMessage);

module.exports = router;
