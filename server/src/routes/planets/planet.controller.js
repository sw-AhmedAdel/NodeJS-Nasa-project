const { getPlanets } = require("../../models/planet.models");

async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
