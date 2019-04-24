"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('mongoose'),
    Mongoose = _require.Mongoose;

var connection = null;

var connectToDB =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var mongoose, mongoUserCredentials, MONGO_URL, DB_NAME, MONGO_CONNECTION_STRING;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mongoose = new Mongoose();
            mongoose.Promise = global.Promise;
            mongoUserCredentials = '';

            if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
              mongoUserCredentials = "".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASSWORD, "@");
            }

            MONGO_URL = process.env.MONGO_URL || 'localhost:27017';
            DB_NAME = process.env.MONGO_DB_NAME || 'sample-db';
            MONGO_CONNECTION_STRING = "mongodb://".concat(mongoUserCredentials).concat(MONGO_URL, "/").concat(DB_NAME);
            _context.next = 9;
            return mongoose.connect(MONGO_CONNECTION_STRING, {
              useNewUrlParser: true
            });

          case 9:
            connection = mongoose;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectToDB() {
    return _ref.apply(this, arguments);
  };
}();

var getDB = function getDB() {
  if (!connection) {
    throw new Error('Call connectToDB first');
  }

  return connection;
};

module.exports = {
  connectToDB: connectToDB,
  getDB: getDB
};