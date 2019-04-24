import schema from "./graphql";
import mongoose from "mongoose";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { models } from "./models";

const pubsub = new PubSub();

//const db = 'mongodb://db_owner:alexandros2911!@ds026018.mlab.com:26018/devfriend'
const db = 'mongodb://localhost:27017/devfriend'

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
      useNewUrlParser: true
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
