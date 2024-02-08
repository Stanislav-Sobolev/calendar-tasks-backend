var mongoose = require('mongoose');
var yearSchema = require('./yearSchema');

var boardSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please enter a board name'],
    },
    cellsData: [yearSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = boardSchema;