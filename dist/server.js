"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.log(error.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use('/api/users', _routes.userRoute);
app.use('/api/products', _routes.productRoute);
app.use('/api/orders', _routes.orderRoute);
app.get('/api/config/paypal', function (req, res) {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.listen(5000, function () {
  console.log('Сервер запущен, http://localhost:5000');
});