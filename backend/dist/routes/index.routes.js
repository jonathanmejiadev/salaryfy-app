"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authGuard = require("../middlewares/auth-guard");

var _auth = _interopRequireDefault(require("./auth.routes"));

var _job = _interopRequireDefault(require("./job.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexRouter = (0, _express.Router)();
indexRouter.use('/', _auth.default);
indexRouter.use('/jobs', _authGuard.passportJwtGuard, _job.default);
var _default = indexRouter;
exports.default = _default;