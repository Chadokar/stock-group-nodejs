const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");
const cookiePraser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

var cors = require("cors");

const port = 8000;
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookiePraser());

// view engine
app.set("view engine", "ejs");

// database connection
const url = "mongodb://localhost:27017/jwt-practice";
let server;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    (result) => (server = app.listen(port, () => console.log("server started")))
  )
  .catch((err) => console.log(err));

// routes
// app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
app.use("/g", groupRoutes);

module.exports = app;
