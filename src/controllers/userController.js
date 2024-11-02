const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../config/dbConfig');
const secretKey = process.env.SECRET_KEY;

// Task 6: Register new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Task 7: Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log("Username or password not provided");
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Incorrect password");
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, secretKey);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};
