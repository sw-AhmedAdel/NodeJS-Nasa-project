const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
app.use(helmet());

const api = require("./routes/api");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public"))); // here to make the project work in on server port which 8000
//here to make the project work on the rote not makein /index.html like above
app.use("/v1", api);
app.use("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;

/*
to make them work on one port i need to get the build file which is for production from the client and put it in the server using 
    "build": "set BUILD_PATH=../server/public&& react-scripts build", and run it in the client

    sec use express.static to render the public put here i will see it using /index.html
app.use(express.static(path.join(__dirname, "..", "public"))); // here to make the project work in on server port which 8000



    so i have to use route to get the project on the route 
    app.use("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});



*/
