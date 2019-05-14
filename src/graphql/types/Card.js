const { gql } = require("apollo-server");


export default gql`
  scalar DateTime
  type Card {
    _id: String!
    category: String!
    user_id: String!
    title: String
    text: String
    date_created: DateTime!
  }
  type Query {
    cardsByCategory(user_id: String!, category: String!): [Card]
    cards: [Card!]!
  }
  type Mutation {
    createCard(card: CreateCardInput): Card!
    updateCard(_id: String!, card: UpdateCardInput!): Card!
    deleteCard(_id: String!): Card!
    deleteCards: Boolean
  }
  input CreateCardInput {
    user_id: String!
    category: String!
    title: String
    text: String
    date_created: DateTime!
  }
  input UpdateCardInput {
    _id: String!
    user_id: String!
    category: String!
    title: String
    text: String
    date_created: DateTime!
  }
`;