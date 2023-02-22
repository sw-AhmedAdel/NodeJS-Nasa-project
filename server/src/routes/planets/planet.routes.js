const express = require("express");
const routePlanet = express.Router();

const { httpGetAllPlanets } = require("./planet.controller");

routePlanet.get("/", httpGetAllPlanets);

module.exports = routePlanet;
