const Group = require("../models/GroupchatModel");
const User = require("../models/User");

module.exports.group_post = async (req, res) => {
  const { groupDetails, userid } = req.body;
  try {
    const group = await Group.create({ groupDetails });
    let user = await User.findById(userid);
    await User.findByIdAndUpdate(userid, {
      groupIds: [...user.groupIds, group._id],
    });
    user = await User.findById(userid);
    // console.log("group: ", group, "user: ", user);
    res.status(201).json({ group, user });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.group_get = async (req, res) => {
  const id = req.params.groupId;
  try {
    const group = await Group.findById(id);
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports.message_post = async (req, res) => {
  const { groupId, messages } = req.body;
  try {
    if (!groupId) {
      throw Error("Group not found");
    } else if (!messages.length) {
      throw Error("No message given");
    }
    await Group.findByIdAndUpdate(groupId, { messages });
    const group = await Group.findById(groupId);
    console.log("group: ", group);
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json(err);
  }
};
