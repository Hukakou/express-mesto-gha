const Card = require('../models/card');
const {
  handleError,
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
} = require('../constants/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(() => handleError);
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch(() => handleError);
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Неправильный id' });
      }
      return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch(() => handleError);
};

const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Неправильный id' });
      } return res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch(() => handleError);
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Неправильный id' });
      } return res.status(HTTP_STATUS_OK).send(card);
    })
    .catch(() => handleError);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
