"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UserSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  jobs: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }]
}, {
  versionKey: false
});
UserSchema.pre('save', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    var salt = yield (0, _bcryptjs.genSalt)(10);
    var hashedPassword = yield (0, _bcryptjs.hash)(user.password, salt);
    user.password = hashedPassword;
    next();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

UserSchema.methods.validatePassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (password) {
    return yield (0, _bcryptjs.compare)(password, this.password);
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

UserSchema.methods.provideToken = function (id) {
  var token = (0, _jsonwebtoken.sign)(id, _config.default.SECRET);
  return token;
};

var _default = (0, _mongoose.model)('User', UserSchema);

exports.default = _default;