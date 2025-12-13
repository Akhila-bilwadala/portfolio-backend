const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email address'
            ],
            lowercase: true,
            trim: true
        },
        message: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Message", MessageSchema);
