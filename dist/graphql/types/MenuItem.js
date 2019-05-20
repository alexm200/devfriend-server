"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  scalar DateTime\n  type MenuItem {\n    _id: String!    \n    userId: String!    \n    text: String\n    hasDivider: Boolean\n    icon: String\n    order: Int\n    dateCreated: DateTime!\n  }\n  type Query {    \n    menuItems(filters: Filters): [MenuItem]\n  }\n  type Mutation {\n    createMenuItem(input: MenuItemInput): MenuItem!\n    updateMenuItem(_id: String!, input: MenuItemInput!): MenuItem!\n    deleteMenuItem(_id: String!): MenuItem!\n    deleteMenuItems: Boolean\n  }\n  input Filters {\n    userId: String\n    text: String\n    hasDivider: Boolean\n    icon: String\n    order: Int  \n  }    \n  input MenuItemInput {\n    userId: String\n    text: String\n    hasDivider: Boolean\n    icon: String\n    order: Int    \n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _require = require("apollo-server"),
    gql = _require.gql;

var _default = gql(_templateObject());

exports["default"] = _default;