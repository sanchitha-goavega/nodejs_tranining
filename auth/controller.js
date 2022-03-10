const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth.schema.js");
//let users = [];

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(200);
    throw new Error("Email / Password required");
  }
  let user = { email, password };
  user.password = bcrypt.hashSync(password, 10);
  // users = [user, ...users];
  //console.log("new user", user);
  await auth.create(user);
  res.json({ success: true, message: "succefully registered", status: true });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new Error("Email/Password required"));
    return;
  }

  const user = await auth.findOne({ email });
  // console.log(user);
  if (!user) {
    res.status(400);
    next(new Error("Invalid Credentialssss"));
    return;
  }
  // console.log(password + "||" + user.password);
  const passwordMatched = bcrypt.compareSync(password, user.password);

  if (!passwordMatched) {
    res.status(403);
    next(new Error("Invalid credentials"));
    return;
  }

  const token = jwt.sign({ email }, process.env.jwt_SECRET);
  res.json({ success: true, token });
};

module.exports = {
  register,
  login,
};
