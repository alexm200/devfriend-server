
const { gql } = require("apollo-server");

export default gql`
  scalar DateTime
  type User {
    _id: String!
    username: String!
    password: String!
    isAdmin: Boolean!
    dateCreated: DateTime!
  }
  type Query {
    users(filters: Filters): [User]    
  }
  type Mutation {
    createUser(input: UserInput): User!
    updateUser(_id: String!, input: UserInput!): User!
    updateUsers(_ids: [String!], inputs: [UserInput!]): Boolean
    deleteUser(_id: String!): User!
    deleteUsers: Boolean
  }
  input Filters {
    _id: String
    username: String
    password: String
  }  
  input UserInput {
    username: String!
    password: String!
    isAdmin: Boolean!    
  }
`;