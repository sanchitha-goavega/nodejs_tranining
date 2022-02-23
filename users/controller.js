let users = [];

const getAll = (req, res) => {
  res.json(users);
};

const create = (req, res) => {
  const { uid, name, dob } = req.body;
  users.push({ uid, name, dob });
  res.json(users);
};

const update = (req, res) => {
  const { name, dob } = req.body;
  const userIndex = users.findIndex((x) => x.uid === req.params.uid);
  users[userIndex] = {
    uid: req.params.uid,
    name,
    dob,
  };
  res.json(users[userIndex]);
};

const deleteUser = (req, res) => {
  users = users.filter((x) => x.uid !== req.params.uid);
  res.json(users);
};

module.exports = {
  getAll,
  create,
  update,
  deleteUser,
};
