const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
    // Check for token in cookies first, then in Authorization header
    let token = req.cookies.token;

    if (!token && req.headers["authorization"]) {
        token = req.headers["authorization"].split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
