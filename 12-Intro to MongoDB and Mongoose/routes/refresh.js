const express = require('express');
const router = express.Router();

// Import the refresh token controller
const refreshTokenController = require('../controllers/refreshTokenController');

// Refresh route (client calls this to get a new access token)
// Using GET because refresh token is sent automatically in the HttpOnly cookie
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;
