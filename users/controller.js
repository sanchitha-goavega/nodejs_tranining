//let users = [];

const users = require("./user.schema.js");

const getAll = async (req, res) => {
  console.log("get all the Users : ", req.user);
  const user_list = await users.find();
  res.json(user_list);
};

const create = async (req, res) => {
  const { uid, name, dob } = req.body;
  if (!uid || !name || !dob) {
    res.status(400);
    next(new Error("Invalid request"));
  }

  const newUser = await users.create({ uid, name, dob });
  res.json({ success: true, user: newUser });
};

const getDetails = async (req, res, next) => {
  const user = await users.findOne({ uid: req.params.uid });
  if (!user) {
    res.status("400");
    next(new Error("Product not found"));
    return;
  }
  res.json({ success: true, user: user });
};

const update = async (req, res) => {
  const { name, dob } = req.body;
  const uid = req.params.uid;
  const updateUser = await users.findOneAndUpdate(
    { uid },
    { name, dob },
    { new: true }
  );

  res.json({ success: true, users: updateUser });
};

const deleteUser = async (req, res) => {
  const { name, dob } = req.body;
  let uid = req.params.uid;
  delUsers = await users.findOneAndRemove({ uid });
  res.json({ success: true, users: delUsers });
};

module.exports = {
  getAll,
  create,
  update,
  deleteUser,
  getDetails,
};
