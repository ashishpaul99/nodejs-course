const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT in incoming requests
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Get 'Authorization' header

    // If no auth header → Unauthorized (401)
    if (!authHeader) return res.sendStatus(401);

    console.log(authHeader); // Example: "Bearer <token>"

    // Extract token from header ("Bearer token")
    const token = authHeader.split(" ")[1];

    // Verify token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET, // Secret key from .env
        (err, decoded) => {
            // If token is invalid/expired → Forbidden (403)
            if (err) return res.sendStatus(403);

            // Save decoded username in request object for later use
            req.user = decoded.username;

            // Continue to next middleware/route
            next();
        }
    );
};

module.exports = verifyJWT;
