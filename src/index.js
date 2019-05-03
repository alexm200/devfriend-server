import schema from "./graphql";
import mongoose from "mongoose";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { models } from "./models";

var express = require('express');
var graphqlHTTP = require('express-graphql');
const cors = require('cors');

const pubsub = new PubSub();

//const db = `mongodb://${process.env.MONGO_URL || "ds026658.mlab.com:26658" }/${process.env.DB_NAME || "devfriend"}`
const db = `mongodb://ds026658.mlab.com:26658/devfriend`;

const options = {
  port: "4000",
  //port: process.env.PORT || "4000",
  endpoint: "/graphql"     
};

const context = {
  models,
  pubsub
};

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      user: "dbAdmin",// process.env.MONGO_USER,
      pass: "a12345"//process.env.MONGO_PASSWORD        
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// var app = express();
// app.use(cors());
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   graphiql: true
// }));
// app.listen(4000);

const server = new GraphQLServer({
  schema,
  context
});

server.start(options, ({ port }) => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
