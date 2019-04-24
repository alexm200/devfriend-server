"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "\n  type User {\n    _id: String!\n    username: String!\n    password: String!   \n  }\n  type Query {\n    user(_id: ID!): User!\n    users: [User!]!\n  }\n  type Mutation {\n    createUser(user: CreateUserInput): User!\n    updateUser(_id: String!, user: UpdateUserInput!): User!\n    deleteUser(_id: String!): User!\n  }\n  input CreateUserInput {\n    username: String!\n    password: String!\n  }\n  input UpdateUserInput {\n    name: String\n    password: String\n  }\n";
exports["default"] = _default;