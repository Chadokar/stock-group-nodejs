const Group = require("../models/GroupchatModel");
const message = require("../models/MessageModel");

module.exports.group_post = async (req, res) => {
  const { groupDetails } = req.body;
  const message = [];
  try {
    const group = await Group.create({ groupDetails, message });
    console.log(group);
    res.status(201).json(group);
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
    const group = await Group.findByIdAndUpdate(groupId, { messages });
    console.log("group: ", group);
    res.status(201).json({ ...group });
  } catch (err) {
    res.status(400).json(err);
  }
};
