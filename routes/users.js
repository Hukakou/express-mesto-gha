const usersRouter = require('express').Router();
const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const { getUserByIdJoi, updateAvatarJoi, updateUserJoi } = require('../middlewares/celebrate');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', getUserByIdJoi, getUserById);
usersRouter.patch('/me', updateUserJoi, updateUser);
usersRouter.patch('/me/avatar', updateAvatarJoi, updateAvatar);

module.exports = usersRouter;
