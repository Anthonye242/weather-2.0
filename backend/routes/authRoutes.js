const express = require("express");
const { loginUser, registerUser, logoutUser } = require("../controllers/authController"); // Corrected file name

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Register route
router.post("/register", registerUser);

// Logout route
router.post("/logout", logoutUser);

module.exports = router;
