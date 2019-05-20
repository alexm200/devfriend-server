"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _MenuItem = require("../../models/MenuItem");

var _default = {
  Query: {
    menuItems: function () {
      var _menuItems = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, _ref, context, info) {
        var filters;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filters = _ref.filters;
                _context.next = 3;
                return MenuItem.find(filters).sort({
                  order: 1
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

      function menuItems(_x, _x2, _x3, _x4) {
        return _menuItems.apply(this, arguments);
      }

      return menuItems;
    }()
  },
  Mutation: {
    createMenuItem: function () {
      var _createMenuItem = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(parent, _ref2, context, info) {
        var input, newItem;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref2.input;
                _context2.next = 3;
                return new MenuItem(input);

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

      function createMenuItem(_x5, _x6, _x7, _x8) {
        return _createMenuItem.apply(this, arguments);
      }

      return createMenuItem;
    }(),
    updateMenuItem: function () {
      var _updateMenuItem = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(parent, _ref3, context, info) {
        var _id, input;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _id = _ref3._id, input = _ref3.input;
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  MenuItem.findByIdAndUpdate(_id, {
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

      function updateMenuItem(_x9, _x10, _x11, _x12) {
        return _updateMenuItem.apply(this, arguments);
      }

      return updateMenuItem;
    }(),
    deleteMenuItem: function () {
      var _deleteMenuItem = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(parent, _ref4, context, info) {
        var _id;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _id = _ref4._id;
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
                  MenuItem.findByIdAndDelete(_id).exec(function (err, res) {
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

      function deleteMenuItem(_x13, _x14, _x15, _x16) {
        return _deleteMenuItem.apply(this, arguments);
      }

      return deleteMenuItem;
    }(),
    deleteMenuItems: function () {
      var _deleteMenuItems = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(parent, args, context, info) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", new Promise(function (resolve, reject) {
                  Card.deleteMany().exec(function (err, res) {
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

      function deleteMenuItems(_x17, _x18, _x19, _x20) {
        return _deleteMenuItems.apply(this, arguments);
      }

      return deleteMenuItems;
    }()
  }
};
exports["default"] = _default;