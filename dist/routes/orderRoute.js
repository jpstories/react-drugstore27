"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _OrderModel = _interopRequireDefault(require("../models/OrderModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var orderRouter = _express["default"].Router();

orderRouter.post('/', _util.isAuth, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var newOrder, newOrderCreated;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.body.orderItems === 0)) {
              _context.next = 4;
              break;
            }

            res.status(404).send({
              message: 'Корзина пуста'
            });
            _context.next = 9;
            break;

          case 4:
            newOrder = new _OrderModel["default"]({
              user: req.user._id,
              orderItems: req.body.orderItems,
              shippingAddress: req.body.shippingAddress,
              paymentMethod: req.body.paymentMethod,
              itemsPrice: req.body.itemsPrice,
              shippingPrice: req.body.shippingPrice,
              taxPrice: req.body.taxPrice,
              totalPrice: req.body.totalPrice
            });
            _context.next = 7;
            return newOrder.save();

          case 7:
            newOrderCreated = _context.sent;
            res.status(201).send({
              message: "Заказ создан",
              order: newOrderCreated
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
orderRouter.get('/:id', _util.isAuth, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var order;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _OrderModel["default"].findById(req.params.id);

          case 2:
            order = _context2.sent;

            if (order) {
              res.send(order);
            } else {
              res.status(404).send({
                message: 'Продукт не найден'
              });
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = orderRouter;
exports["default"] = _default;