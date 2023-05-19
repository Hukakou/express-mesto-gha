const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: "Server Error" }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User is not found тест" });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Bad Request" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "User with _id cannot be found" });
      }
      return res.status(500).send({ message: "Server Error" });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

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
  console.log(about);

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
