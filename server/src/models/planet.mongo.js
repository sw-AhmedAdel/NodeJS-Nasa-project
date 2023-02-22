const mongoose = require("mongoose");
const planetSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    require: true,
  },
});

const planets = mongoose.model("Planet", planetSchema);

module.exports = planets;
