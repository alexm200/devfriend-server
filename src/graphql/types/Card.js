const { gql } = require("apollo-server");


export default gql`
  scalar DateTime
  type Card {
    _id: String!
    userId: String!
    category: String!    
    title: String
    text: String
    dateCreated: DateTime!
  }
  type Query {    
    cards(filters: Filters): [Card]
  }
  type Mutation {
    createCard(input: CardInput): Card!
    updateCard(_id: String!, input: CardInput!): Card!
    updateCards(_ids: [String!], inputs: [CardInput!]): Boolean
    deleteCard(_id: String!): Card!
    deleteCards: Boolean
  }
  input Filters {
    userId: String
    category: String    
    title: String
    text: String
    dateCreated: DateTime
  }  
  input CardInput {
    _id: String
    userId: String
    category: String
    title: String
    text: String
    dateCreated: DateTime
  }
`;