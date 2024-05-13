const express = require("express");
const {
  addUser,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.post("/", addUser);
userRoute.get("/", getAllUsers);
userRoute.get("/:userId", getUserById);

module.exports = {
  userRoute,
};
