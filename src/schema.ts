export const typeDefs = `
  type Query {
    hello: String
  }

  type Mutation {
    addUser(name: String!): User
  }

  type User {
    id: ID!
    name: String!
  }
`;
