export default `
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