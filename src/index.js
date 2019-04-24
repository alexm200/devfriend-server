import schema from "./graphql";
import mongoose from "mongoose";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { models } from "./models";

const pubsub = new PubSub();

const db = 'mongodb://ds026658.mlab.com:26658/devfriend'
//const db = 'mongodb://localhost:27017/devfriend'

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
      user: "dbAdmin",
      pass: "a12345"        
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const server = new GraphQLServer({
  schema,
  context
});

server.start(options, ({ port }) => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
