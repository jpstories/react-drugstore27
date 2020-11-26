"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isAuth = exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getToken = function getToken(user) {
  return _jsonwebtoken["default"].sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, _config["default"].JWT_SECRET, {
    expiresIn: '48h'
  });
};

exports.getToken = getToken;

var isAuth = function isAuth(req, res, next) {
  var authorization = req.headers.authorization;

  if (authorization) {
    var token = authorization.slice(7, authorization.length);

    _jsonwebtoken["default"].verify(token, _config["default"].JWT_SECRET, function (err, decode) {
      if (err) {
        return res.status(401).send({
          message: 'Invalid Token'
        });
      }

      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({
      message: 'Token is not supplied.'
    });
  }
};

exports.isAuth = isAuth;

var isAdmin = function isAdmin(req, res, next) {
  console.log(req.user);

  if (req.user && req.user.isAdmin) {
    return next();
  }

  return res.status(401).send({
    message: 'Admin Token is not valid.'
  });
};

exports.isAdmin = isAdmin;