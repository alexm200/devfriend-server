const { gql } = require("apollo-server");

export default gql`
  scalar DateTime
  type MenuItem {
    _id: String!    
    userId: String!    
    text: String
    isHeader: Boolean
    hasDivider: Boolean
    icon: String
    order: Int
    dateCreated: DateTime!
  }
  type Query {    
    menuItems(filters: Filters): [MenuItem]
  }
  type Mutation {
    createMenuItem(input: MenuItemInput): MenuItem!
    updateMenuItem(_id: String!, input: MenuItemInput!): MenuItem!
    updateMenuItems(_ids: [String!], inputs: [MenuItemInput!]): Boolean
    deleteMenuItem(_id: String!): MenuItem!
    deleteMenuItems: Boolean
  }
  input Filters {
    userId: String
    text: String
    hasDivider: Boolean
    icon: String
    order: Int
    dateCreated: DateTime
  }    
  input MenuItemInput {
    _id: String
    userId: String
    text: String
    isHeader: Boolean
    hasDivider: Boolean
    icon: String
    order: Int
    dateCreated: DateTime    
  }
`;