const { UserModel } = require("../models/user.model");

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const percent = [20, 10, 5, 1, 1, 1, 1, 1];
const totalLevels = percent.length;

const distributeEarning = async (req, res) => {
  const { userId } = req.params;
  const { toBeDistribute } = req.query;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let totalPerToDistribute = 0;
    for (let i = 0; i < totalLevels; i++) {
      totalPerToDistribute += percent[i];
    }
    let remaining = 100 - totalPerToDistribute;
    if (remaining <= 0) {
      return res.status(400).json({ error: "The user must earn something" });
    }

    // Distribution to parents
    let parent = user;
    let level = 1;
    let head = new Node(parent);
    let current = head;
    while (parent.parent_id && level <= totalLevels) {
      const parentDetail = await UserModel.findById(parent.parent_id);
      if (!parentDetail) {
        break;
      }
      const { _id, earning } = parentDetail;
      const updatedEarning =
        earning + (toBeDistribute * percent[level - 1]) / 100;
      await UserModel.findByIdAndUpdate(_id, {
        earning: updatedEarning,
      });
      parentDetail.earning = updatedEarning;
      parent = parentDetail;
      current.next = new Node(parentDetail);
      current = current.next;
      level++;
    }
    // Distribute to himself
    while (level <= totalLevels) {
      remaining += percent[level - 1];
      level++;
    }
    const updatedUserEarning=user.earning + (toBeDistribute * remaining) / 100;
    await UserModel.findByIdAndUpdate(user._id, {
      earning: updatedUserEarning,
    });
    user.earning=updatedUserEarning;
    const newHead = new Node(user);
    newHead.next = head.next;
    return res
      .status(200)
      .json({ message: "Earning Distributed", distribution: newHead });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  distributeEarning,
};
