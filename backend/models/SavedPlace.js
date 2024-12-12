const mongoose = require("mongoose");

const savedPlaceSchema = new mongoose.Schema({
  city: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weatherData: { type: Object, required: true },
});

module.exports = mongoose.model("SavedPlace", savedPlaceSchema);
