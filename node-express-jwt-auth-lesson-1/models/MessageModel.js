const mongoose = require("mongoose");

const { server } = require("../app");

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

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);
  console.log(server);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ groupId }) => {
    socket.join(groupId);
    console.log("A user joined chatroom: " + groupId);
  });

  socket.on("leaveRoom", ({ groupId }) => {
    socket.leave(groupId);
    console.log("A user left chatroom: " + groupId);
  });

  socket.on("chatroomMessage", async ({ groupId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: groupId,
        user: socket.userId,
        message,
      });
      io.to(groupId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
