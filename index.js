require("dotenv").config();
const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.route");

const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());

app.use("/api", userRoute);
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Metalistic Home Page" });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Connected to Db. \nServer is running at ${port}.`);
  } catch (error) {
    console.log("Error: Couldn`t connect");
    console.log(error);
  }
});
