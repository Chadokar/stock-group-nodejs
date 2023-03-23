const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors

const handleError = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // Incorrect Email
  if (err.message === "Incorrect Email") {
    errors.email = "This email is not registered";
  }

  // Incorrect Password
  if (err.message === "Incorrect Password") {
    errors.password = "Incorrect Password";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "chadokar", {
    expiresIn: maxAge,
  });
};

// module.exports.signup_get = (req, res) => {
//   res.render("signup");
// };

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user, token });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  console.log("entered");
  res.cookie("jwt", "", { maxAge: 1 });
};

module.exports.update_user_put = async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email } = req.body;
  const userid = req.params.userid;
  try {
    const user = await User.findByIdAndUpdate(userid, {
      firstname: firstname,
      lastname: lastname,
      email: email,
    });
    if (!user) {
      throw Error("User not found");
    }
    const userInfo = await User.findById(req.params.userid);
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

module.exports.get_details = async (req, res) => {
  console.log(req.params);
  const id = req.params.userid;
  console.log(id);
  try {
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (err) {
    res.status(401).json(err);
  }
};

var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&apikey=E3T2L10PTU6WK0SE";

module.exports.get_data = async (req, res) => {
  let datas = {};
  try {
    const response = await new Promise((resolve, reject) => {
      request.get(
        {
          url: url,
          json: true,
          headers: { "User-Agent": "request" },
        },
        (err, response, data) => {
          if (err) {
            reject(err);
          } else if (response.statusCode !== 200) {
            reject(new Error(`Status: ${response.statusCode}`));
          } else {
            // data is successfully parsed as a JSON object:
            resolve(data);
          }
        }
      );
    });
    res.status(200).json(response);
  } catch (err) {
    res.json(err);
  }
};
