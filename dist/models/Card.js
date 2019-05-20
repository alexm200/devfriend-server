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

var _default = _mongoose["default"].model("Card", new Schema({
  userId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  dateCreated: {
    type: Date,
    required: true,
    "default": Date.now()
  }
}));

exports["default"] = _default;