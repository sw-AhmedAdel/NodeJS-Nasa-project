const LaunchesSchema = require("./launches.mongo");
const planets = require("./planet.mongo");
const DEFULAT_FLIGHT_NUMBER = 100;

async function getLatestFlightNumber() {
  const latestLaunch = await LaunchesSchema.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFULAT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
  await LaunchesSchema.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function addNewLaunch(launch) {
  const planet = await planets.findOne({
    kepler_name: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["Nasa"],
    upcoming: true,
    success: true,
  });
  await saveLaunch(newLaunch);
  return newLaunch;
}

async function getALlLaunches(skip, limit) {
  return await LaunchesSchema.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  )
    .sort({ flightNumber: 1 })
    .limit(limit)
    .skip(skip);
}

async function isLaunchExits(id) {
  return await LaunchesSchema.findOne({
    flightNumber: id,
  });
}

async function abortlaunchByID(id) {
  const launch = await LaunchesSchema.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return launch.modifiedCount === 1 && launch.acknowledged === true;
}

module.exports = {
  getALlLaunches,
  addNewLaunch,
  isLaunchExits,
  abortlaunchByID,
};
