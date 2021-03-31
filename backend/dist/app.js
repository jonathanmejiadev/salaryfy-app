"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var _database = _interopRequireDefault(require("./database"));

var _config = _interopRequireDefault(require("./config"));

var _passport = _interopRequireDefault(require("passport"));

var _passport2 = _interopRequireDefault(require("./middlewares/passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var app = (0, _express.default)();
var PORT = _config.default.PORT || 5000; //middlewares

app.use(_express.default.json());
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use((0, _morgan.default)('dev'));
app.use(_passport.default.initialize());

_passport.default.use(_passport2.default); //testing


app.get('/products', (req, res) => {
  res.status(200).json({
    msg: 'all products'
  });
});
app.get('/products/:id', (req, res) => {
  if (req.params.id === 'U0001') {
    return res.json('Product U0001 Found');
  }

  return res.status(404).json('Product not found');
});
app.post('/products', (req, res) => {
  var {
    name,
    stock
  } = req.body;

  if (name && stock) {
    return res.status(201).json({
      success: true,
      message: 'Product has been created'
    });
  }

  return res.status(400).json({
    success: false,
    message: 'Bad Request'
  });
});
app.get('/users', (req, res) => {
  res.status(200).json({
    msg: 'all users'
  });
}); //routes

app.use('/v1', _index.default);

var startApp = () => {
  if (_config.default.NODE_ENV != 'test') {
    (0, _database.default)();
  }

  app.listen(PORT, function () {
    console.log("Connected on http://localhost:".concat(PORT, "/v1"));
  });
};

startApp();
var _default = app; //"test" : "NODE_ENV=test nodemon --exec 'mocha -R min'"

exports.default = _default;