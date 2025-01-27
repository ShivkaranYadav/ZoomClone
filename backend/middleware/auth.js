const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded._id; // Attach user ID to request object
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
module.exports = { auth }