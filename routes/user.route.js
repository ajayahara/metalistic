const express = require("express");
const {
  addUser,
  distributeEarning,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.get("/users",getAllUsers)
userRoute.get("/users/userId",getUserById)
userRoute.post("/users", addUser);
userRoute.post("/distribute", distributeEarning);

module.exports = {
  userRoute,
};
