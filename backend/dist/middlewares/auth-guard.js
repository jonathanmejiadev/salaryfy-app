"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportJwtGuard = void 0;

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passportJwtGuard = _passport.default.authenticate('jwt', {
  session: false
});

exports.passportJwtGuard = passportJwtGuard;