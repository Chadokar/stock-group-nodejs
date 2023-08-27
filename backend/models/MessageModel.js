const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
    isliked: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
