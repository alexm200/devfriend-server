"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _User = _interopRequireDefault(require("./User"));

var _Card = _interopRequireDefault(require("./Card"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var resolvers = [_User["default"], _Card["default"], _MenuItem["default"]];

var _default = (0, _mergeGraphqlSchemas.mergeResolvers)(resolvers);

exports["default"] = _default;