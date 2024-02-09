const expressRouts = require('express');
const {
  getBoardById,
  createBoard,
  updateBoardName,
  deleteBoard,
  createCard,
  updateCard,
  dragAndDropCard,
  deleteCard,
} = require('../controllers/boardController');

const router = expressRouts.Router();

router.get('/board/:id', getBoardById);
router.post('/card/:boardId/:yearId/:monthId/:cellId', createCard);
router.put('/card/:boardId/:yearId/:monthId/:cellId/:cardId', updateCard);
router.patch('/card/:boardId/:yearId/:monthId/:cellId/:cardId/:toMonthId/:toCellId/:toCardIndexId', dragAndDropCard);
router.delete('/card/:boardId/:yearId/:monthId/:cellId/:cardId', deleteCard);

module.exports = router;
