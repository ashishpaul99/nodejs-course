const User = require('../model/User');
const bcrypt = require('bcrypt');

// Controller to handle new user registration
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  // 🔹 1. Validate input
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' }); // 400 Bad Request
  }

  // 🔹 2. Check for duplicate username in DB
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    return res.sendStatus(409); // 409 Conflict (user already exists)
  }

  try {
    // 🔹 3. Hash the password (salt rounds = 10)
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // 🔹 4. Create and store the new user in DB
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log('✅ New User Created:', result);

    // 🔹 5. Send success response
    res.status(201).json({ message: `New user ${user} created!` }); // 201 Created
  } catch (err) {
    // 🔹 6. Handle unexpected server errors
    res.status(500).json({ message: err.message }); // 500 Internal Server Error
  }
};

// Export controller
module.exports = { handleNewUser };




