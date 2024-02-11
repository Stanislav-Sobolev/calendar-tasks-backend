"use strict";
var mongoose = require('mongoose');
var cellSchema = require('./cellSchema');
var boardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please enter a board name'],
    },
    cellsData: [cellSchema],
}, {
    timestamps: true,
});
module.exports = boardSchema;
//# sourceMappingURL=boardSchema.js.map