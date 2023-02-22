const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planets = require("./planet.mongo");

function ishabitablePlanets(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#", //So now we're telling it that we want to treat lines that start with this character as comments,to ignore them
          columns: true, //This will return.Each row in our CSV file as a JavaScript object with key value pairs, rather than as just an array
        })
      )
      .on("data", async (data) => {
        //this data is chunk of data i will recive  like line by line
        if (ishabitablePlanets(data)) {
          await savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const planetsLentgh = (await getPlanets()).length;
        console.log(`${planetsLentgh} habitable Planets`);
        resolve();
      });
  });
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        kepler_name: planet.kepler_name,
      },
      {
        kepler_name: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save it ${err}`);
  }
}

async function getPlanets() {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0, // to excelude them
    }
  );
}

module.exports = {
  getPlanets,
  loadPlanetData,
};
