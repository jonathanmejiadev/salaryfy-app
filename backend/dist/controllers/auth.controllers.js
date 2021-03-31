"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profile = exports.login = exports.register = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        username,
        email,
        password
      } = req.body;
      var userData = new _user.default({
        username,
        email,
        password
      });
      yield userData.save();
      return res.status(201).json({
        success: true,
        message: 'User registration successfully',
        data: userData
      });
    } catch (err) {
      res.status(500).json({
        err: err.message
      });
    }
  });

  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        username,
        password
      } = req.body;
      var user = yield _user.default.findOne({
        username
      });
      if (!user) return res.status(404).json({
        success: false,
        code: 404,
        error: 'User not found'
      });
      var isValid = yield user.validatePassword(password);
      if (!isValid) return res.status(401).json({
        success: false,
        code: 401,
        error: 'The password is incorrect'
      });
      var token = yield user.provideToken({
        id: user._id
      });
      return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        access_token: token,
        type_token: 'Bearer'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        err: err
      });
    }
  });

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;

var profile = (req, res) => {
  console.log(req.user);
  return res.status(200).json({
    success: true,
    data: req.user
  });
};

exports.profile = profile;