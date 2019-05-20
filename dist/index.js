"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _graphql = _interopRequireDefault(require("./graphql"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _graphqlYoga = require("graphql-yoga");

var _models = require("./models");

var express = require('express');

var graphqlHTTP = require('express-graphql');

var cors = require('cors');

var fs = require('fs');

var pubsub = new _graphqlYoga.PubSub();
var db = "mongodb://".concat(process.env.MONGO_URL || "localhost:27017", "/").concat(process.env.DB_NAME || "devfriend");
var options = {
  port: process.env.PORT || "4000",
  endpoint: "/graphql"
};
var context = {
  models: _models.models,
  pubsub: pubsub
}; //Create dsk

console.log("create");
fs.appendFile("dist/sdk/sdk.js", 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
}); // Connect to MongoDB with Mongoose.

_mongoose["default"].connect(db, {
  useCreateIndex: true,
  useNewUrlParser: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD
}).then(function () {
  return console.log("MongoDB connected");
})["catch"](function (err) {
  return console.log(err);
}); // var app = express();
// app.use(cors());
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   graphiql: true
// }));
// app.listen(4000);


var server = new _graphqlYoga.GraphQLServer({
  schema: _graphql["default"],
  context: context
});
server.start(options, function (_ref) {
  var port = _ref.port;
  console.log("\uD83D\uDE80 Server is running on http://localhost:".concat(port));
});