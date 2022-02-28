const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let users = [];

const register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(200);
    throw new Error("Email / Password required");
  }
  let user = { email, password };
  user.password = bcrypt.hashSync(password, 10);
  users = [user, ...users];
  res.json({ message: "succefully registered", status: true });
};
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email/Password Credentials");
  }

  const user = users.find((e) => e.email === email);
  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
  const passwordMatched = bcrypt.compareSync(password, user.password);

  if (!passwordMatched) {
    res.status(403);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ email }, process.env.jwt_SECRET);
  res.json({ success: true, token });
};

module.exports = {
  register,
  login,
};
