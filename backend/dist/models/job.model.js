"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var JobSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  earnings: {
    type: Number,
    required: true
  },
  seconds: {
    type: Number,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  userOwner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: String,
    required: true
  },
  technologies: {
    type: [String],
    required: true
  }
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)('Job', JobSchema);

exports.default = _default;