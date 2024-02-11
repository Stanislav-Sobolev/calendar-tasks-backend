var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please enter an item name'],
    },
    description: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = cardSchema;