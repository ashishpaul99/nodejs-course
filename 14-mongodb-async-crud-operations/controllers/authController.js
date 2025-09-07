const User = require('../model/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Handle user login request
const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    // If username or password is missing → return 400 (Bad Request)
    if (!user || !pwd) {
        return res.status(400).json({ "message": "Username and password are required" });
    }

    // Find user in DB → returns the full object if found, otherwise null
    const foundUser = await User.findOne({ username: user }).exec();

    // If user not found → return 401 (Unauthorized)
    if (!foundUser) return res.sendStatus(401);

    // Compare provided password with stored hashed password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        console.log("Roles going into JWT:", roles);

        // Create Access Token (short-lived)
        const accessToken = jwt.sign(
            {
                "UserInfo": {    
                    "username": foundUser.username,
                    "roles": roles
                }
            },
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
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        // Send refresh token as HttpOnly cookie (secure, not accessible by JS)
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // Send access token in response body (used for API requests)
        res.json({ accessToken });

    } else { 
        // If password does not match → return 401 (Unauthorized)
        res.sendStatus(401);
    }
};

module.exports = { handleLogin };
