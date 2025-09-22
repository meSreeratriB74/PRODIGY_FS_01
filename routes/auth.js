const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ✅ Protected Route
router.get("/protected", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ msg: `✅ Welcome, user ${decoded.userId}` });
} catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
}
});

module.exports = router;
