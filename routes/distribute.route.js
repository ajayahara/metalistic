const express = require("express");
const { distributeEarning } = require("../controllers/distribute.controller");

const distributeRoute = express.Router();
distributeRoute.post("/:userId", distributeEarning);

module.exports = {
  distributeRoute,
};
