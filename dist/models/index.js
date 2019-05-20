"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.models = void 0;

var _User = _interopRequireDefault(require("./User"));

var _Card = _interopRequireDefault(require("./Card"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var models = {
  User: _User["default"],
  Card: _Card["default"],
  MenuItem: _MenuItem["default"]
};
exports.models = models;