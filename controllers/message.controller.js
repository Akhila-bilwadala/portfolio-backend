const Message = require('../models/message.model');

// Create a new message
const createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please provide a valid email address"
            });
        }

        // Create message with sanitized data
        const newMessage = await Message.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            message: message.trim()
        });

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all messages
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 }); // Newest first
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a message
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByIdAndDelete(id);
        if (!message) return res.status(404).json({ message: "Message not found" });

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMessage,
    getMessages,
    deleteMessage
};
