const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token (no fallback - JWT_SECRET is required)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            return next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Not authorized" });
        }
    }

    return res.status(401).json({ message: "Not authorized, no token" });
};

module.exports = { protect };
