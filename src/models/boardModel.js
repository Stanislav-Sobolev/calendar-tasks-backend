
var mongoose = require('mongoose');
var boardSchema = require('./schemes/boardSchema');

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;