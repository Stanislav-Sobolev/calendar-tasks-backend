var cryptoModule = require('crypto');
var Board = require('../models/boardModel');
var emptyCellTemplate = require('../models/emptyCellTemplate.json');

const hashId = (id) => {
  const hash = cryptoModule.createHash('sha256');
  hash.update(id.toString());
  return hash.digest('hex');
};

exports.getBoardById = async (req, res) => {
  try {
    const id = req.params.id;
    const board = await Board.findOne({ id: hashId(id) });

    if (!board) {
      return res.status(404).json({ message: 'Cannot find any board with ID ' + id });
    }

    res.status(200).json(board);
  } catch (error) {
    if (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
  
exports.createCard = async (req, res) => {
  try {
    const { boardId, cellId } = req.params;
    const board = await Board.findOne({ id: boardId });
    
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
    }

    let cell = board.cellsData.find((cellItem) => cellItem.id === parseInt(cellId));
    if (!cell) {      
      const cellCreate = { ...emptyCellTemplate, id: parseInt(cellId)};
      board.cellsData.push(cellCreate)
      
      cell = board.cellsData.find((cellItem) => cellItem.id === parseInt(cellId));
    }

    const card = { ...req.body };
    cell.items.push(card);
    
    await board.save();

    res.status(200).json(card);
  } catch (error) {
    if (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
  
exports.updateCard = async (req, res) => {
  try {
    const { boardId, cellId, cardId } = req.params;
    const board = await Board.findOne({ id: boardId });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
    }

    const cell = board.cellsData.find((cellItem) => cellItem.id === parseInt(cellId));
    
    if (!cell) {
      return res.status(404).json({ message: `Cannot find any cell with ID ${cellId}` });
    }

    const cardIndex = cell.items.findIndex((c) => c.id === parseInt(cardId));
    
    if (cardIndex === -1) {
      return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
    }

    cell.items[cardIndex] = { ...req.body, id: cardId };

    await board.save();

    res.status(200).json(cell.items[cardIndex]);
  } catch (error) {
    if (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
  
exports.dragAndDropCard = async (req, res) => {
  try {
    const {
      boardId,
      cellId,
      cardId,
      toCellId,
      toCardIndexId,
    } = req.params;
    const board = await Board.findOne({ id: boardId });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
    }

    const cellFrom = board.cellsData.find((col) => col.id === parseInt(cellId));
    let cellTo = board.cellsData.find((col) => col.id === parseInt(toCellId));

    if (!cellFrom) {
      return res.status(404).json({ message: `Cannot find any cell with ID ${cellId}` });
    }

    if (!cellTo) {
      const cellCreate = { ...emptyCellTemplate, id: parseInt(toCellId)};
      board.cellsData.push(cellCreate)
      
      cellTo = board.cellsData.find((cellItem) => cellItem.id === parseInt(toCellId));
    }

    const cardIndex = cellFrom.items.findIndex((c) => c.id === parseInt(cardId));
    if (cardIndex === -1) {
      return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
    }

    const card = cellFrom.items[cardIndex];
    cellFrom.items.splice(cardIndex, 1);
    cellTo.items.splice(Number(toCardIndexId), 0, card);

    await board.save();

    res.status(200).json(card);
  } catch (error) {
    if (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { boardId, cellId, cardId } = req.params;
    const board = await Board.findOne({ id: boardId });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
    }

    const cell = board.cellsData.find((cellItem) => cellItem.id === parseInt(cellId));
    
    if (!cell) {
      return res.status(404).json({ message: `Cannot find any cell with ID ${cellId}` });
    }

    const cardIndex = cell.items.findIndex((c) => c.id === parseInt(cardId));
    if (cardIndex === -1) {
      return res.status(404).json({ message: `Cannot find any card with ID ${cardId}` });
    }

    const deletedCard = cell.items.splice(cardIndex, 1)[0];

    await board.save();

    res.status(200).json(deletedCard);
  } catch (error) {
    if (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
