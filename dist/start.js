'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _mongodb = require('mongodb');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _index = require('../util/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());

var homePath = '/graphiql';
var URL = 'http://localhost';
var PORT = 3001;
var MONGO_URL = 'mongodb://localhost:27017/devfirend';

var start = exports.start = function _callee() {
  var db, Posts, Comments, typeDefs, resolvers, schema;
  return regeneratorRuntime.async(function _callee$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(_mongodb.MongoClient.connect(MONGO_URL));

        case 3:
          db = _context8.sent;
          Posts = db.collection('posts');
          Comments = db.collection('comments');
          typeDefs = ['\n      type Query {\n        post(_id: String): Post\n        posts: [Post]\n        comment(_id: String): Comment\n      }\n\n      type Post {\n        _id: String\n        title: String\n        content: String\n        comments: [Comment]\n      }\n\n      type Comment {\n        _id: String\n        postId: String\n        content: String\n        post: Post\n      }\n\n      type Mutation {\n        createPost(title: String, content: String): Post\n        createComment(postId: String, content: String): Comment\n      }\n\n      schema {\n        query: Query\n        mutation: Mutation\n      }\n    '];
          resolvers = {
            Query: {
              post: function post(root, _ref) {
                var _id = _ref._id;
                return regeneratorRuntime.async(function post$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = _index.prepare;
                        _context.next = 3;
                        return regeneratorRuntime.awrap(Posts.findOne((0, _mongodb.ObjectId)(_id)));

                      case 3:
                        _context.t1 = _context.sent;
                        return _context.abrupt('return', (0, _context.t0)(_context.t1));

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, null, undefined);
              },
              posts: function posts() {
                return regeneratorRuntime.async(function posts$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return regeneratorRuntime.awrap(Posts.find({}).toArray());

                      case 2:
                        _context2.t0 = _index.prepare;
                        return _context2.abrupt('return', _context2.sent.map(_context2.t0));

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, null, undefined);
              },
              comment: function comment(root, _ref2) {
                var _id = _ref2._id;
                return regeneratorRuntime.async(function comment$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = _index.prepare;
                        _context3.next = 3;
                        return regeneratorRuntime.awrap(Comments.findOne((0, _mongodb.ObjectId)(_id)));

                      case 3:
                        _context3.t1 = _context3.sent;
                        return _context3.abrupt('return', (0, _context3.t0)(_context3.t1));

                      case 5:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Post: {
              comments: function comments(_ref3) {
                var _id = _ref3._id;
                return regeneratorRuntime.async(function comments$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return regeneratorRuntime.awrap(Comments.find({ postId: _id }).toArray());

                      case 2:
                        _context4.t0 = _index.prepare;
                        return _context4.abrupt('return', _context4.sent.map(_context4.t0));

                      case 4:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Comment: {
              post: function post(_ref4) {
                var postId = _ref4.postId;
                return regeneratorRuntime.async(function post$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.t0 = _index.prepare;
                        _context5.next = 3;
                        return regeneratorRuntime.awrap(Posts.findOne((0, _mongodb.ObjectId)(postId)));

                      case 3:
                        _context5.t1 = _context5.sent;
                        return _context5.abrupt('return', (0, _context5.t0)(_context5.t1));

                      case 5:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, null, undefined);
              }
            },
            Mutation: {
              createPost: function createPost(root, args, context, info) {
                var res;
                return regeneratorRuntime.async(function createPost$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return regeneratorRuntime.awrap(Posts.insertOne(args));

                      case 2:
                        res = _context6.sent;
                        return _context6.abrupt('return', (0, _index.prepare)(res.ops[0]));

                      case 4:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, null, undefined);
              },
              createComment: function createComment(root, args) {
                var res;
                return regeneratorRuntime.async(function createComment$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return regeneratorRuntime.awrap(Comments.insert(args));

                      case 2:
                        res = _context7.sent;
                        _context7.t0 = _index.prepare;
                        _context7.next = 6;
                        return regeneratorRuntime.awrap(Comments.findOne({ _id: res.insertedIds[1] }));

                      case 6:
                        _context7.t1 = _context7.sent;
                        return _context7.abrupt('return', (0, _context7.t0)(_context7.t1));

                      case 8:
                      case 'end':
                        return _context7.stop();
                    }
                  }
                }, null, undefined);
              }
            }
          };
          schema = (0, _graphqlTools.makeExecutableSchema)({
            typeDefs: typeDefs,
            resolvers: resolvers
          });


          app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: schema }));

          app.use(homePath, (0, _graphqlServerExpress.graphiqlExpress)({
            endpointURL: '/graphql'
          }));

          app.listen(PORT, function () {
            console.log('Visit ' + URL + ':' + PORT + homePath);
          });

          _context8.next = 17;
          break;

        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8['catch'](0);

          console.log(_context8.t0);

        case 17:
        case 'end':
          return _context8.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};