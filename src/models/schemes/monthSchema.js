
var mongoose = require('mongoose');
var cellSchema = require('./cellSchema');

var monthSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    cells: [cellSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = monthSchema;