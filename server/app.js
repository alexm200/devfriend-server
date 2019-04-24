import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { connectToDB } from './database';

// Start the http server
const startServer = async () => {
  const { User } = require('./database/models');

  // GraphQL Types
  const typeDefs = `
    type User {
        _id: String!
        username: String!
        password: String!   
    }
    type Query {
        user(_id: ID!): User!
        users: [User!]!
    }
    type Mutation {
        createUser(user: CreateUserInput): User!
        updateUser(_id: String!, user: UpdateUserInput!): User!
        deleteUser(_id: String!): User!
    }
    input CreateUserInput {
        username: String!
        password: String!
    }
    input UpdateUserInput {
        name: String
        password: String
    }
  `;

  // GraphQL resolvers
  const resolvers = {
    Query: {
        user: async (parent, { _id }, context, info) => {
          return await User.findOne({ _id }).exec();
        },
        users: async (parent, args, context, info) => {
          const users = await User.find({})
            .populate()
            .exec();
    
          return users.map(u => ({
            _id: u._id.toString(),
            username: u.username,
            password: u.password
          }));
        }
      },
      Mutation: {
        createUser: async (parent, { user }, context, info) => {
          const newUser = await new User({
            username: user.username,
            password: user.password
          });
    
          return new Promise((resolve, reject) => {
            newUser.save((err, res) => {
              err ? reject(err) : resolve(res);
            });
          });
        },
        updateUser: async (parent, { _id, user }, context, info) => {
          return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
              (err, res) => {
                err ? reject(err) : resolve(res);
              }
            );
          });
        },
        deleteUser: async (parent, { _id }, context, info) => {
          return new Promise((resolve, reject) => {
            User.findByIdAndDelete(_id).exec((err, res) => {
              err ? reject(err) : resolve(res);
            });
          });
        }
      }
  };

  // Define a schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Initiate express and define routes
  const app = express();
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.use('/', graphiqlExpress({ endpointURL: '/graphql' }));

  // Initiate the server
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port: ${process.env.PORT || 3000}`);
  });
};

// Connecting to DB and then start the server
const dbConnectAndStartServer = async () => {
  try {
    await connectToDB();
    console.log('Connected to Mongo successfully');
    startServer();
  } catch (err) {
    console.error(`Error connecting to mongo - ${err.message}`);
    process.exit(1);
  }
};

// Entry point
dbConnectAndStartServer();