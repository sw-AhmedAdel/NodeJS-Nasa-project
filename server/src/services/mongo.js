const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("mongo is running");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
