const path = require("path");
const express = require("express");
const OS = require("os");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public/")));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'sample_guides'
  })
  .then(function () {
    console.log("MongoDB Connection Successful");
  })
  .catch(function(err){
    console.log('connection error',err);
  });

var Schema = mongoose.Schema;

var dataSchema = new Schema({
  name: String,
  orderFromSun: Number,
  hasRings: Boolean,
  mainAtmosphere: Array,
  surfaceTemperatureC: Object
});
var planetModel = mongoose.model("planets", dataSchema);

app.post("/planet", async function (req, res) {
//   console.log("Received Planet ID " + req.body.id)
  try {
    let planetData = await planetModel.findOne( { orderFromSun: req.body.id, }).exec();
    res.send(planetData);
  } catch (error) {
    alert(
        "Ooops, We only have 9 planets and a sun. Select a number from 0 - 9"
      );
      res.send("Error in Planet Data");
  }
});

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/public/", "index.html"));
});

app.get("/os", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    os: OS.hostname(),
    env: process.env.NODE_ENV,
  });
});

app.get("/live", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    status: "live",
  });
});

app.get("/ready", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send({
    status: "ready",
  });
});

const server = app.listen(3000, () => {
  console.log("Server successfully running on port - " + 3000);
});

module.exports = {app, server};
