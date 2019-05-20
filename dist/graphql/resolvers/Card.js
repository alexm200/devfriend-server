"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Card = _interopRequireDefault(require("../../models/Card"));

var _default = {
  Query: {
    cards: function () {
      var _cards = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, _ref, context, info) {
        var filters;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filters = _ref.filters;
                _context.next = 3;
                return _Card["default"].find(filters).sort({
                  dateCreated: -1
                }).populate().exec();

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function cards(_x, _x2, _x3, _x4) {
        return _cards.apply(this, arguments);
      }

      return cards;
    }()
  },
  Mutation: {
    createCard: function () {
      var _createCard = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(parent, _ref2, context, info) {
        var input, newItem;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref2.input;
                _context2.next = 3;
                return new _Card["default"](input);

              case 3:
                newItem = _context2.sent;
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  newItem.save(function (err, res) {
                    err ? reject(err) : resolve(res);
                  });
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createCard(_x5, _x6, _x7, _x8) {
        return _createCard.apply(this, arguments);
      }

      return createCard;
    }(),
    updateCard: function () {
      var _updateCard = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(parent, _ref3, context, info) {
        var _id, input;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _id = _ref3._id, input = _ref3.input;
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  _Card["default"].findByIdAndUpdate(_id, {
                    $set: (0, _objectSpread2["default"])({}, input)
                  }, {
                    "new": true,
                    useFindAndModify: false
                  }).exec(function (err, res) {
                    err ? reject(err) : resolve(res);
                  });
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateCard(_x9, _x10, _x11, _x12) {
        return _updateCard.apply(this, arguments);
      }

      return updateCard;
    }(),
    deleteCard: function () {
      var _deleteCard = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(parent, _ref4, context, info) {
        var _id;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _id = _ref4._id;
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  _Card["default"].findByIdAndDelete(_id).exec(function (err, res) {
                    err ? reject(err) : resolve(res);
                  });
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function deleteCard(_x13, _x14, _x15, _x16) {
        return _deleteCard.apply(this, arguments);
      }

      return deleteCard;
    }(),
    deleteCards: function () {
      var _deleteCards = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(parent, args, context, info) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", new Promise(function (resolve, reject) {
                  _Card["default"].deleteMany().exec(function (err, res) {
                    err ? reject(err) : resolve(res.ok);
                  });
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteCards(_x17, _x18, _x19, _x20) {
        return _deleteCards.apply(this, arguments);
      }

      return deleteCards;
    }()
  }
};
exports["default"] = _default;