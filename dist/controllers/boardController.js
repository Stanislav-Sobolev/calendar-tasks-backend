"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cryptoModule = require('crypto');
var Board = require('../models/boardModel');
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
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
            const cellCreate = { id: parseInt(cellId), title: "day", items: [] };
            board.cellsData.push(cellCreate);
            cell = board.cellsData.find((cellItem) => cellItem.id === parseInt(cellId));
        }
        if (!cell) {
            return res.status(404).json({ message: `Cannot find any cell with ID ${cellId}` });
        }
        const card = { ...req.body };
        cell.items.push(card);
        await board.save();
        res.status(200).json(card);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
exports.dragAndDropCard = async (req, res) => {
    try {
        const { boardId, cellId, cardId, toCellId, toCardIndexId, } = req.params;
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
            const cellCreate = { id: parseInt(toCellId), title: "day", items: [] };
            board.cellsData.push(cellCreate);
            cellTo = board.cellsData.find((cellItem) => cellItem.id === parseInt(toCellId));
        }
        if (!cellTo) {
            return res.status(404).json({ message: `Cannot find any cell with ID ${toCellId}` });
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: error });
        }
    }
};
//# sourceMappingURL=boardController.js.map