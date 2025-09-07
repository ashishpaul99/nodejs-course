const User = require('../model/User');

// 🔹 Logout Controller
const handleLogout = async (req, res) => {
    // 1. Get cookies from request
    const cookies = req.cookies;

    // If no cookies OR no jwt cookie → No content (204)
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    // 2. Check if refresh token exists in DB
    const foundUser = await User.findOne({ refreshToken }).exec();

    // If no user is found → clear cookie and return 204
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // 3. Remove refresh token from DB (log out user)
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log("🗑 Refresh token removed:", result);

    // 4. Clear the cookie in client
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); 
    // secure:true → cookie only sent over HTTPS in production

    // 5. Send "No Content" success response
    res.sendStatus(204);
};

module.exports = { handleLogout };
