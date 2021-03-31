"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI_TESTING: process.env.MONGODB_URI_TESTING
};
exports.default = _default;