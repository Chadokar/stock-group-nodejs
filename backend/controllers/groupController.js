const Group = require("../models/GroupchatModel");
const User = require("../models/User");

module.exports.group_post = async (req, res) => {
  const { groupDetails, userId } = req.body;
  try {
    let user = await User.findById(userId);
    const group = await Group.create({
      groupDetails: {
        ...groupDetails,
        groupMembers: [
          {
            memberId: userId,
            memberName: user.firstname + " " + user.lastname,
          },
        ],
      },
    });
    await User.findByIdAndUpdate(userId, {
      groups: [
        ...user.groups,
        { groupId: group._id, groupName: group.groupDetails.groupName },
      ],
    });
    user = await User.findById(userId);
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

module.exports.add_member = async (req, res) => {
  const groupId = req.params.groupId;
  const { email } = req.body;
  try {
    let group = await Group.findById(groupId);
    let user = await User.findOne({ email });

    // Check if the user is already a member of the group
    const isMember = group.groupDetails.groupMembers.some(
      (member) => member.memberId.toString() === user._id.toString()
    );

    if (isMember) {
      return res
        .status(400)
        .json({ error: "User is already a member of the group." });
    }
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    await Group.findByIdAndUpdate(groupId, {
      groupDetails: {
        ...group.groupDetails,
        groupMembers: [
          ...group.groupDetails.groupMembers,
          {
            memberId: user._id,
            memberName: user.firstname + " " + user.lastname,
          },
        ],
      },
    });
    await User.findByIdAndUpdate(user._id, {
      groups: [
        ...user.groups,
        { groupId: group._id, groupName: group.groupDetails.groupName },
      ],
    });
    group = await Group.findById(groupId);
    user = await User.findById(user._id);
    res.status(201).json({ group, user });
  } catch (err) {
    res.status(400).json(err);
  }
};
