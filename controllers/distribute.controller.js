const { UserModel } = require("../models/user.model");

const percent = [0.2, 0.1, 0.05, 0.01, 0.01, 0.01, 0.01, 0.01];
const totalLevels = percent.length;

const distributeEarning = async (req, res) => {
  const { userId } = req.params;
  const { toBeDistribute } = req.query;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const totalPerDistribute = parent.reduce((acc, val) => {
      return acc + val;
    }, 0);
    let remaining = 1 - totalPerDistribute;

    // Distribution to parents
    let level = 1;
    let parent = user;
    while (parent.parent_id && level <= totalLevels) {
      const parentDetail = await UserModel.findById(parent.parent_id);
      if (!parentDetail) {
        break;
      }
      const { _id, name, earning } = parentDetail;
      await UserModel.findByIdAndUpdate(_id, {
        earning: earning + toBeDistribute * percent[level - 1],
      });
      parent = parentDetail;
      level++;
    }
    // Distribute to himself
    while (level <= totalLevels) {
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
  distributeEarning,
};
