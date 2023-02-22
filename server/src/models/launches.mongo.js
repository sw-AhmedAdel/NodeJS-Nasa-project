const mongoose = require("mongoose");
const launchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    require: true,
  },
  mission: {
    type: String,
    require: true,
  },
  rocket: {
    type: String,
    require: true,
  },
  launchDate: {
    type: Date,
    require: true,
  },
  target: {
    type: String,
    require: true,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    require: true,
  },
  success: {
    type: Boolean,
    require: true,
  },
});

const LaunchesSchema = mongoose.model("Launch", launchSchema);
module.exports = LaunchesSchema;
