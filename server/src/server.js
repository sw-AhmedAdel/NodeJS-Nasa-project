const http = require("http");
require("dotenv").config();
const app = require("./app");
const PORT = 8000;
const server = http.createServer(app);
const { mongoConnect } = require("./services/mongo");
const { loadPlanetData } = require("./models/planet.models");

async function startServer() {
  await mongoConnect();
  await loadPlanetData();

  server.listen(PORT, () => {
    console.log("running");
  });
}

startServer();
