
var mongoose = require('mongoose');
var monthSchema = require('./monthSchema');

var yearSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    months: [monthSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = yearSchema;