
var mongoose = require('mongoose');
var cardSchema = require('./cardSchema');

var cellSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please enter a cell title'],
    },
    items: [cardSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = cellSchema;