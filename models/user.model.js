const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
