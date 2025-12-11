const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret_key", {
        expiresIn: '30d',
    });
};

// Login User
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Seed Admin User (Internal use)
const seedAdmin = async () => {
    try {
        const adminUsername = "akhila";
        const adminPassword = "060526"; // In real app, use env var

        const userExists = await User.findOne({ username: adminUsername });

        if (!userExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            await User.create({
                username: adminUsername,
                password: hashedPassword
            });
            console.log("Admin user seeded successfully");
        }
    } catch (error) {
        console.error("Error seeding admin:", error);
    }
};

module.exports = {
    loginUser,
    seedAdmin
};
