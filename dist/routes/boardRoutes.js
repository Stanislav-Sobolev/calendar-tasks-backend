"use strict";
const expressRouts = require('express');
const { getBoardById, createBoard, updateBoardName, deleteBoard, createCard, updateCard, dragAndDropCard, deleteCard, } = require('../controllers/boardController');
const router = expressRouts.Router();
router.get('/board/:id', getBoardById);
router.post('/card/:boardId/:cellId', createCard);
router.put('/card/:boardId/:cellId/:cardId', updateCard);
router.patch('/card/:boardId/:cellId/:cardId/:toCellId/:toCardIndexId', dragAndDropCard);
router.delete('/card/:boardId/:cellId/:cardId', deleteCard);
module.exports = router;
//# sourceMappingURL=boardRoutes.js.map