const { UserModel } = require("../models/user.model");

const getAllUsers = async (req, res) => {
  const { page } = req.query;
  const defaultPage = page >= 1 ? page : 1;
  const limit = 10;
  try {
    const users = await UserModel.find()
      .skip((defaultPage - 1) * limit)
      .limit(limit);

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addUser = async (req, res) => {
  const { name, parent_id } = req.body;
  try {
    const newUser = new UserModel({
      name,
      parent_id,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const distributeEarning = async (req, res) => {
  const { userId } = req.params;
  const { toBeDistribute } = req.query;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const percent = [0.2, 0.1, 0.05, 0.01, 0.01, 0.01, 0.01, 0.01];
    let level = 1;
    let parent = user;
    while (parent.parent_id && level <= 8) {
      const parentDetail = await UserModel.findById(parent.parent_id);
      const { _id, name, earning } = parentDetail;
      await UserModel.findByIdAndUpdate(_id, {
        earning: earning + toBeDistribute * percent[level - 1],
      });
      parent = parentDetail;
      level++;
    }
    let remaining = 0.6;
    while (level <= 8) {
      remaining += percent[level - 1];
      level++;
    }
    await UserModel.findByIdAndUpdate(user._id, {
      earning: user.earning + toBeDistribute * remaining,
    });
    return res.status(200).json({ message: "Earning Distributed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  distributeEarning,
};
