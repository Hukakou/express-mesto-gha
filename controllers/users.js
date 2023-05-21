const User = require('../models/user');
const {
  handleError,
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
} = require('../constants/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => handleError);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: 'User is not found' });
      } return res.send(user);
    })
    .catch(() => handleError);
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(HTTP_STATUS_CREATED).send(user);
    })
    .catch(() => handleError);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(HTTP_STATUS_OK).send({ data: user }))
    .catch(() => handleError);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(() => res.status(HTTP_STATUS_OK).send({ avatar }))
    .catch(() => handleError);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
