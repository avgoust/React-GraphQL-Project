const typeDefs = `#graphql

  type User {
    first_name: String!
    last_name: String!
    email_address: String!
    username: String!
    id: ID!
  }

  input UserInput {
    first_name: String!
    last_name: String!
    username: String
    email_address: String
  }

  type Query {
    users: [User!]!
    user( firstName: String!, lastName: String!): User
  }

  type Mutation {
    createUser(input: UserInput!): User!
    deleteUser(id:ID!): String
    updateUser(id: ID!, input: UserInput!): User 
  }
`;

export default typeDefs;