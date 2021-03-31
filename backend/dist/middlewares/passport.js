"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passportJwt = require("passport-jwt");

var _user = _interopRequireDefault(require("../models/user.model"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var opts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _config.default.SECRET
};

var _default = new _passportJwt.Strategy(opts, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (payload, done) {
    try {
      var user = yield _user.default.findById(payload.id);

      if (!user) {
        return done(err, false);
      }

      return done(null, user);
    } catch (err) {
      return done(null, false);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = _default;