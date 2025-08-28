// subdir.js - Router for handling subdirectory routes
const express = require('express');
const router = express.Router();
const path = require('path');

// Route: /subdir/ or /subdir/index or /subdir/index.html
// Serves views/subdir/index.html
router.get(/^\/$|^\/index(.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

// Route: /subdir/test or /subdir/test.html
// Serves views/subdir/test.html
router.get(/^\/test(.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});

// Export the router so it can be used in server.js
module.exports = router;


