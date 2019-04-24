"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _apolloServerExpress = require("apollo-server-express");

var _graphqlTools = require("graphql-tools");

var _database = require("./database");

// Start the http server
var startServer =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    var _require, User, typeDefs, resolvers, schema, app;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _require = require('./database/models'), User = _require.User; // GraphQL Types

            typeDefs = "\n    type User {\n        _id: String!\n        username: String!\n        password: String!   \n    }\n    type Query {\n        user(_id: ID!): User!\n        users: [User!]!\n    }\n    type Mutation {\n        createUser(user: CreateUserInput): User!\n        updateUser(_id: String!, user: UpdateUserInput!): User!\n        deleteUser(_id: String!): User!\n    }\n    input CreateUserInput {\n        username: String!\n        password: String!\n    }\n    input UpdateUserInput {\n        name: String\n        password: String\n    }\n  "; // GraphQL resolvers

            resolvers = {
              Query: {
                user: function () {
                  var _user = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee(parent, _ref2, context, info) {
                    var _id;

                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _id = _ref2._id;
                            _context.next = 3;
                            return User.findOne({
                              _id: _id
                            }).exec();

                          case 3:
                            return _context.abrupt("return", _context.sent);

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  function user(_x, _x2, _x3, _x4) {
                    return _user.apply(this, arguments);
                  }

                  return user;
                }(),
                users: function () {
                  var _users = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee2(parent, args, context, info) {
                    var users;
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return User.find({}).populate().exec();

                          case 2:
                            users = _context2.sent;
                            return _context2.abrupt("return", users.map(function (u) {
                              return {
                                _id: u._id.toString(),
                                username: u.username,
                                password: u.password
                              };
                            }));

                          case 4:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  function users(_x5, _x6, _x7, _x8) {
                    return _users.apply(this, arguments);
                  }

                  return users;
                }()
              },
              Mutation: {
                createUser: function () {
                  var _createUser = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee3(parent, _ref3, context, info) {
                    var user, newUser;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            user = _ref3.user;
                            _context3.next = 3;
                            return new User({
                              username: user.username,
                              password: user.password
                            });

                          case 3:
                            newUser = _context3.sent;
                            return _context3.abrupt("return", new Promise(function (resolve, reject) {
                              newUser.save(function (err, res) {
                                err ? reject(err) : resolve(res);
                              });
                            }));

                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  function createUser(_x9, _x10, _x11, _x12) {
                    return _createUser.apply(this, arguments);
                  }

                  return createUser;
                }(),
                updateUser: function () {
                  var _updateUser = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee4(parent, _ref4, context, info) {
                    var _id, user;

                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _id = _ref4._id, user = _ref4.user;
                            return _context4.abrupt("return", new Promise(function (resolve, reject) {
                              User.findByIdAndUpdate(_id, {
                                $set: (0, _objectSpread2["default"])({}, user)
                              }, {
                                "new": true
                              }).exec(function (err, res) {
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

                  function updateUser(_x13, _x14, _x15, _x16) {
                    return _updateUser.apply(this, arguments);
                  }

                  return updateUser;
                }(),
                deleteUser: function () {
                  var _deleteUser = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee5(parent, _ref5, context, info) {
                    var _id;

                    return _regenerator["default"].wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _id = _ref5._id;
                            return _context5.abrupt("return", new Promise(function (resolve, reject) {
                              User.findByIdAndDelete(_id).exec(function (err, res) {
                                err ? reject(err) : resolve(res);
                              });
                            }));

                          case 2:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  function deleteUser(_x17, _x18, _x19, _x20) {
                    return _deleteUser.apply(this, arguments);
                  }

                  return deleteUser;
                }()
              }
            }; // Define a schema

            schema = (0, _graphqlTools.makeExecutableSchema)({
              typeDefs: typeDefs,
              resolvers: resolvers
            }); // Initiate express and define routes

            app = (0, _express["default"])();
            app.use('/graphql', _bodyParser["default"].json(), (0, _apolloServerExpress.graphqlExpress)({
              schema: schema
            }));
            app.use('/', (0, _apolloServerExpress.graphiqlExpress)({
              endpointURL: '/graphql'
            })); // Initiate the server

            app.listen(process.env.PORT || 3000, function () {
              console.log("Server started on port: ".concat(process.env.PORT || 3000));
            });

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}(); // Connecting to DB and then start the server


var dbConnectAndStartServer =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _database.connectToDB)();

          case 3:
            console.log('Connected to Mongo successfully');
            startServer();
            _context7.next = 11;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.error("Error connecting to mongo - ".concat(_context7.t0.message));
            process.exit(1);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));

  return function dbConnectAndStartServer() {
    return _ref6.apply(this, arguments);
  };
}(); // Entry point
//dbConnectAndStartServer();