"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _graphql = _interopRequireDefault(require("../graphql"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _graphqlYoga = require("graphql-yoga");

var _models = require("../models");

var pubsub = new _graphqlYoga.PubSub();
var db = 'mongodb://localhost:27017/devfriend';
var options = {
  port: process.env.PORT || "4000",
  endpoint: "/graphql"
};
var context = {
  models: _models.models,
  pubsub: pubsub
}; // Connect to MongoDB with Mongoose.

_mongoose["default"].connect(db, {
  useCreateIndex: true,
  useNewUrlParser: true
}).then(function () {
  return console.log("MongoDB connected");
})["catch"](function (err) {
  return console.log(err);
});

var server = new _graphqlYoga.GraphQLServer({
  schema: _graphql["default"],
  context: context
});
server.start(options, function (_ref) {
  var port = _ref.port;
  console.log("\uD83D\uDE80 Server is running on http://localhost:".concat(port));
});