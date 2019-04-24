"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodb = require("mongodb");

var Schema = _mongoose["default"].Schema;

_mongodb.ObjectID.prototype.valueOf = function () {
  return this.toString();
};

var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var _default = _mongoose["default"].model("User", UserSchema);

exports["default"] = _default;