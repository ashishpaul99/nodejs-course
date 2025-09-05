// Import the list of allowed origins
const allowedOrigins = require('../config/allowedOrigins');

// Middleware function to handle credentials (cookies/auth headers in CORS)
const credentials = (req, res, next) => {
    // Get the origin of the incoming request
    const origin = req.headers.origin;   

    // Check if the request's origin is in our allowed list
    if (allowedOrigins.includes(origin)) {
        // If yes, set the header to allow credentials (cookies/auth headers) for this origin
        res.header('Access-Control-Allow-Credentials', true);
    }

    // Continue to next middleware
    next();
};

// Export the middleware to use in server.js/app.js
module.exports = credentials;
