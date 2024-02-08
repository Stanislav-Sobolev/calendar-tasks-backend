var cryptoModule = require('crypto');
var Board = require('../models/boardModel');
var emptyTemplate = require('../models/emptyTemplate.json');

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

exports.createBoard = async (req, res) => {
  try {
    req.body.id = hashId(req.body.id);
    const board = await Board.create(req.body);
    res.status(200).json(board);
  } catch (error) {
    if (error) {
      res.status(500).json({ message: error.message });
    }
  }
};


exports.updateBoardName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const board= await Board.findOneAndUpdate({ id }, { name }, { new: true });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${id}` });
    }
    res.status(200).json(board);
  } catch (error) {
    if (error) {
      res.status(500).json({ message: error.message });
    }
  }
  };
  
exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findOneAndDelete({ id });
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${id}` });
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
    const { boardId, yearId, monthId, cellId } = req.params;
    const board = await Board.findOne({ id: boardId });
    
    if (!board) {
      return res.status(404).json({ message: `Cannot find any board with ID ${boardId}` });
    }

    let year = board.cellsData.find((el) => el.id === parseInt(yearId));
    
    if (!year) {
      const yearCreate = { ...emptyTemplate, id: parseInt(yearId)};
      board.cellsData.push(yearCreate)
      
      year = board.cellsData.find((yearItem) => yearItem.id === parseInt(yearId));
    }
    
    const month = year.months.find((monthItem) => monthItem.id === parseInt(monthId));
    if (!month) {
      return res.status(404).json({ message: `Cannot find any month with ID ${monthId}` });
    }

    const cell = month.cells.find((cellItem) => cellItem.id === parseInt(cellId));
    if (!cell) {
      return res.status(404).json({ message: `Cannot find any cell with ID ${cellId}` });
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

    const cell = board.cellsData.find((col) => col.id === parseInt(cellId));

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
    const cellTo = board.cellsData.find((col) => col.id === parseInt(toCellId));

    if (!cellFrom || !cellTo) {
      return res.status(404).json({ message: `Cannot find any cell with ID ${cellId} or ${cellTo}` });
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

    const cell = board.cellsData.find((col) => col.id === parseInt(cellId));
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
