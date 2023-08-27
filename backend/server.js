require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

require("./models/GroupchatModel");
require("./models/MessageModel");
require("./models/User");

const app = require("./app");

// view engine
app.set("view engine", "ejs");

const server = app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const Message = mongoose.model("Message");
const User = require("./models/User");

io.use(async (socket, next) => {
  try {
    let token = socket.handshake.query.token;
    token = token.substring(1, token.length - 1);
    console.log(token);
    const payload = jwt.verify(token, "chadokar");
    socket.userId = payload.id;
    next();
  } catch (err) {
    console.log("error: ", err);
  }
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

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
        senderId: socket.userId,
        content: message,
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
