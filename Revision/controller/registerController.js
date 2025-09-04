const userDB = {
    users: require('../model/users.json'),
    setUser: function (data) {
        this.users = data;
    }
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ 'message': 'Username and password are required' });
    }

    // check duplicate
    const duplicate = userDB.users.find(person => person.username === user);
    if (duplicate) return res.sendStatus(409); // Conflict

    try {
        // hash password
        const hashpwd = await bcrypt.hash(pwd, 10);
        const newUser = { username: user, password: hashpwd };

        // update in memory
        userDB.setUser([...userDB.users, newUser]);

        // save to file (make sure it's users.json)
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users, null, 2)
        );

        console.log(userDB.users);
        res.status(201).json({ 'message': `New user ${user} created` });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

module.exports = { handleNewUser };




