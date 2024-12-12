const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { city } = req.query;
  try {
    // Geocoding API to get latitude and longitude
    const geocodeUrl = `https://geocode.maps.co/search?q=${city}&api_key=${process.env.GEOCODER_API_KEY}`;
    const geocodeResponse = await axios.get(geocodeUrl);

    if (!geocodeResponse.data.length) return res.status(404).json({ message: "City not found" });

    const { lat, lon } = geocodeResponse.data[0];
    const pointsUrl = `https://api.weather.gov/points/${lat},${lon}`;
    const pointsResponse = await axios.get(pointsUrl);

    const forecastUrl = pointsResponse.data.properties.forecast;
    const forecastResponse = await axios.get(forecastUrl);

    res.json(forecastResponse.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data", error });
  }
});

module.exports = router;
