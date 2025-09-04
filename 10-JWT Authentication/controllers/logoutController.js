// In-memory user database (loaded from users.json)
const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
};

const fsPromises = require('fs').promises;
const path = require('path');

// Logout Controller
const handleLogout = async (req, res) => {
    // 1. Get cookies from request
    const cookies = req.cookies;

    // If no cookies OR no jwt cookie → No content (204)
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    // 2. Check if refresh token exists in DB
    const foundUser = userDB.users.find(
        person => person.refreshToken === refreshToken
    );

    // If no user found → clear the cookie and return 204
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    // 3. Remove refresh token from DB for the logged-out user
    const otherUsers = userDB.users.filter(
        person => person.refreshToken !== foundUser.refreshToken
    );

    // Current user with refreshToken cleared
    const currentUser = { ...foundUser, refreshToken: '' };

    // Update in-memory DB
    userDB.setUsers([...otherUsers, currentUser]);

    // Save updated DB to users.json
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(userDB.users, null, 2) // ✅ pretty print JSON
    );

    // 4. Clear the cookie in client
    res.clearCookie('jwt', { httpOnly: true, secure: true }); 
    // secure:true → cookie only sent over HTTPS in production

    // 5. Send "No Content" success response
    res.sendStatus(204);
};

module.exports = { handleLogout };
