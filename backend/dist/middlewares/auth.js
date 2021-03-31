"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkUserEmailExists = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkUserEmailExists = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var {
        username,
        email
      } = req.body;
      var [usernameRes, emailRes] = yield Promise.all([_user.default.findOne({
        username: username
      }), _user.default.findOne({
        email: email
      })]);
      if (usernameRes && emailRes) return res.status(409).json({
        errors: [{
          success: false,
          message: 'Username is already taken'
        }, {
          success: false,
          message: 'Email already exists'
        }]
      });
      if (usernameRes) return res.status(409).json({
        success: false,
        message: 'Username is already taken'
      });
      if (emailRes) return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
      return next();
    } catch (err) {
      console.log(err.message);
      next();
    }
  });

  return function checkUserEmailExists(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkUserEmailExists = checkUserEmailExists;