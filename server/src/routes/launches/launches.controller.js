const {
  getALlLaunches,
  addNewLaunch,
  isLaunchExits,
  abortlaunchByID,
  isPlanetValid,
} = require("../../models/launches.models");

const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getALlLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpPostNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.target ||
    !launch.rocket
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  const planet = await isPlanetValid(launch.target);
  if (!planet) {
    return res.status(400).json({
      error: "Invalid planet",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  const newLaunch = await addNewLaunch(launch);
  return res.status(201).json(newLaunch);
}

async function httpDeleteLaunch(req, res) {
  const id = Number(req.params.id);
  const launch = await isLaunchExits(id);

  if (!launch) {
    return res.status(400).json({
      error: "Not found",
    });
  }
  const abortedLaunch = await abortlaunchByID(id);
  if (!abortedLaunch) {
    return res.status(400).json({
      error: " already aborted!!",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpPostNewLaunch,
  httpDeleteLaunch,
};
