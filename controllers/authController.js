const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// Register a new user
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Authenticate a user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // console.log("process.env.JWT_SECRET_KEY", process.env.JWT_SECRET_KEY);
    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 3600000000 }
    );
    console.log("TOKEN", token);
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during password update:", error.message);
    res.status(500).json({ message: "Server error during password update" });
  }
};

module.exports = { register, login, forgotPassword };
