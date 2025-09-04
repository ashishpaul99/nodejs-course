// In-memory user DB (loaded from users.json file)
const userDB = {
    users: require('../model/users.json'),
    setUser: function (data) {
        this.users = data;
    }
};

// import bcrypt
const bcrypt = require("bcrypt");

// Import the jsonwebtoken package
const jwt = require('jsonwebtoken');

// Load environment variables from the .env file
require('dotenv').config();

// Import fs Promises API (using files/JSON instead of a database for now)
const fsPromises = require('fs').promises;

// Import path module to handle and transform file paths
const path = require('path');


// Handle user login request
const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    // If username or password is missing → return 400 (Bad Request)
    if (!user || !pwd) {
        return res.status(400).json({ "message": "Username and password are required" });
    }

    // Find user in DB → returns the full object if found, otherwise undefined
    const foundUser = userDB.users.find(person => person.username === user);

    // If user not found → return 401 (Unauthorized)
    if (!foundUser) return res.sendStatus(401);

    // Compare provided password with stored hashed password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {

    // Create Access Token (short-lived token)   
    const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
    );

    // Create Refresh Token (long-lived token)
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    // Save refresh token in DB (so we can invalidate it on logout)

    // Get all users except the current one
    // otherUsers = all users except the one who just logged in.  
    const otherUsers = userDB.users.filter(person =>person.username !== foundUser.username);

    // Add refresh token to current user
    const currentUser = { ...foundUser,     refreshToken};

    // Update users array (others + current)
    userDB.setUser([...otherUsers, currentUser]);

    // Write updated users to file (persist changes)
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(userDB.users)
    );

    // Send refresh token as HttpOnly cookie (secure, not accessible by JS)
res.cookie('jwt', refreshToken, {
    httpOnly: true,              // Cookie can't be accessed by client-side JS
    sameSite: 'None',            // Required for cross-site cookie sharing
    secure: true,                // Cookie only sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000  // Cookie expires in 1 day
});

   
    // Send access token in response body (used for API requests)
    res.json({ accessToken });

    } else { 
        // If password does not match → return 401 (Unauthorized)
        res.sendStatus(401);
    }
};

module.exports = { handleLogin };

