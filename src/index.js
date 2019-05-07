import schema from "./graphql";
import mongoose from "mongoose";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { models } from "./models";

var express = require('express');
var graphqlHTTP = require('express-graphql');
const cors = require('cors');

const pubsub = new PubSub();

const db = `mongodb://${process.env.MONGO_URL || "localhost:27017" }/${process.env.DB_NAME || "devfriend"}`

const options = {
  port: process.env.PORT || "4000",
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
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD        
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
