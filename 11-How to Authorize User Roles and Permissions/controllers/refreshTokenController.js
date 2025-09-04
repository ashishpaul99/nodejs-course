// In-memory user database (loaded from users.json file)
const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
};

// Import jsonwebtoken
const jwt = require('jsonwebtoken');

// Load environment variables from .env
require('dotenv').config();


// Refresh Token Controller
const handleRefreshToken = async (req, res) => {
    // 1. Get cookies from request
    const cookies = req.cookies;

    // If no cookies OR no "jwt" cookie → return 401 Unauthorized
    if (!cookies?.jwt) return res.sendStatus(401);

    console.log("Refresh Token from cookie:", cookies.jwt);

    const refreshToken = cookies.jwt;

    // 2. Check if refreshToken exists in DB (user previously logged in)
    const foundUser = userDB.users.find(
        person => person.refreshToken === refreshToken
    );

    // If no user found with this refresh token → 403 Forbidden
    if (!foundUser) return res.sendStatus(403);

    // 3. Verify refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,  // ✅ FIX: use correct secret
        (err, decoded) => {
            // If invalid token OR username mismatch → 403 Forbidden
        if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403);
        }

        const roles = Object.values(foundUser.roles);

        // 4. Create a new access token (short-lived)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                "username": decoded.username,
                "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );


            // Send new access token to client
            res.json({ accessToken });
        }
    );
};

module.exports = { handleRefreshToken };
