const express = require("express");
const SavedPlace = require("../models/SavedPlace");
const isSignedIn = require("../middleware/authMiddleware");

const router = express.Router();

// Get all saved places for a user
router.get("/", isSignedIn, async (req, res) => {
  try {
    const savedPlaces = await SavedPlace.find({ user: req.session.user.id });
    res.json(savedPlaces);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved places" });
  }
});

// Add a new saved place
router.post("/", isSignedIn, async (req, res) => {
  const { city, weatherData } = req.body;
  try {
    const newPlace = new SavedPlace({ city, user: req.session.user.id, weatherData });
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ message: "Error saving place" });
  }
});

module.exports = router;
