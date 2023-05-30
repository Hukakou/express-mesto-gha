const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

const { createCardJoi, checkCardIdJoi } = require('../middlewares/celebrate');

router.get('/', getCards);
router.post('/', createCardJoi, createCard);
router.delete('/:cardId', checkCardIdJoi, deleteCard);
router.put('/:cardId/likes', checkCardIdJoi, addLikeCard);
router.delete('/:cardId/likes', checkCardIdJoi, deleteLikeCard);

module.exports = router;
