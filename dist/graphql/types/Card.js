"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  scalar DateTime\n  type Card {\n    _id: String!\n    userId: String!\n    category: String!    \n    title: String\n    text: String\n    dateCreated: DateTime!\n  }\n  type Query {    \n    cards(filters: Filters): [Card]\n  }\n  type Mutation {\n    createCard(input: CardInput): Card!\n    updateCard(_id: String!, input: CardInput!): Card!\n    deleteCard(_id: String!): Card!\n    deleteCards: Boolean\n  }\n  input Filters {\n    userId: String\n    category: String    \n    title: String\n    text: String    \n  }  \n  input CardInput {\n    userId: String\n    category: String\n    title: String\n    text: String    \n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _require = require("apollo-server"),
    gql = _require.gql;

var _default = gql(_templateObject());

exports["default"] = _default;