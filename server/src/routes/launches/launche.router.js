const express = require("express");
const routeLaunces = express.Router();

const {
  httpGetAllLaunches,
  httpPostNewLaunch,
  httpDeleteLaunch,
} = require("./launches.controller");

routeLaunces.get("/", httpGetAllLaunches);
routeLaunces.post("/", httpPostNewLaunch);
routeLaunces.delete("/:id", httpDeleteLaunch);
module.exports = routeLaunces;
