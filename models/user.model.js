const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "Users",
  },
  earning: { type: Number, required: true, default: 0 },
});

const UserModel = mongoose.model("Users", userSchema);
module.exports = { UserModel };
