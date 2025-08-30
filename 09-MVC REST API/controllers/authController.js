// In-memory user DB (loaded from users.json file)
const userDB = {
    users: require('../model/users.json'),
    setUser: function (data) {
        this.users = data;
    }
};

const bcrypt = require("bcrypt");

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
        // If password matches → login success
        res.json({ 'success': `User ${user} is logged in!` });
    } else {
        // If password does not match → return 401 (Unauthorized)
        res.sendStatus(401);
    }
};

module.exports = { handleLogin };

