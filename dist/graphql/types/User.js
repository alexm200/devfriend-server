"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  scalar DateTime\n  type User {\n    _id: String!\n    username: String!\n    password: String!\n    isAdmin: Boolean!\n    dateCreated: DateTime!\n  }\n  type Query {\n    users(filters: Filters): [User]    \n  }\n  type Mutation {\n    createUser(input: UserInput): User!\n    updateUser(_id: String!, input: UserInput!): User!\n    deleteUser(_id: String!): User!\n    deleteUsers: Boolean\n  }\n  input Filters {\n    _id: String\n    username: String\n    password: String\n  }  \n  input UserInput {\n    username: String!\n    password: String!\n    isAdmin: Boolean!    \n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _require = require("apollo-server"),
    gql = _require.gql;

var _default = gql(_templateObject());

exports["default"] = _default;