const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: "Server Error" }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  console.log(id);
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User is not found тест" });
      } else {
        res.send(user);
      }
    })
    .catch((err) => res.status(500).send({ message: "Server Error" }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(name);
  console.log(about);
  console.log(avatar);

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "переданы некорректные данные" });
      } else {
        return res.status(500).send({ message: err.message });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
