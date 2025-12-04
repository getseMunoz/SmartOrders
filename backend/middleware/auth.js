// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
        // Bearer <token>
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || 'secret_key_dev');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

const verifyRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};

module.exports = { verifyToken, verifyRole };