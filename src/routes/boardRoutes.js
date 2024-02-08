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
router.post('/board', createBoard);
router.put('/board/:id', updateBoardName);
router.delete('/board/:id', deleteBoard);
router.post('/card/:boardId/:cellId', createCard);
router.put('/card/:boardId/:cellId/:cardId', updateCard);
router.patch('/card/:boardId/:cellId/:cardId/:tocellId/:toCardIndexId', dragAndDropCard);
router.delete('/card/:boardId/:cellId/:cardId', deleteCard);

module.exports = router;
