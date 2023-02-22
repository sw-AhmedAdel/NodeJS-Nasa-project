const express = require("express");
const api = express.Router();

const routePlanet = require("./planets/planet.routes");
const routeLaunces = require("./launches/launche.router");

api.use("/planets", routePlanet);
api.use("/launches", routeLaunces);
module.exports = api;
