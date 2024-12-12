const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();  // Load environment variables from .env

const authRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const savedPlacesRoutes = require("./routes/savedPlacesRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret is loaded from .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Root route (Homepage)
app.get("/", (req, res) => {
  res.send("<h1>Weather App</h1><p>Server is running! Go to /api/auth, /api/weather or /api/saved-places for more.</p>");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Weather routes
app.use("/api/weather", weatherRoutes);

// Saved Places routes
app.use("/api/saved-places", savedPlacesRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
