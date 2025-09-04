// userDB object to manage in-memory users and update them
const userDB = {
    users: require('../model/users.json'), // load existing users from JSON file
    setUser: function (data) {
        this.users = data; // update users list
    }
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

// Handle new user registration request
const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;

    // If username or password is missing → return 400 (Bad Request)
    if (!user || !pwd) {
        return res.status(400).json({ 'message': 'Username and password are required' });
    }

    // Check for duplicate username in the database
    const duplicate = userDB.users.find(person => person.username === user);

    // If username already exists → return 409 (Conflict)
    if (duplicate) return res.sendStatus(409);

    try {
        // Encrypt the password
        // Salt rounds = 10 (higher value → more secure but slower)
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // Create new user object
        const newUser = { "username": user, "password": hashedPwd };

        // Store the new user in the in-memory DB
        userDB.setUser([...userDB.users, newUser]);

        // Save updated user list to JSON file
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'), // corrected path
            JSON.stringify(userDB.users, null, 2) // pretty JSON with indentation
        );

        console.log(userDB.users);

        // 201 (Created) → user successfully registered
        res.status(201).json({ 'message': `New user ${user} created!` });
    } catch (err) {
        // 500 (Internal Server Error) if something goes wrong
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = { handleNewUser };




