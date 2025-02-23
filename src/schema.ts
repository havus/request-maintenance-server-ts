export const typeDefs = `
  type Query {
    hello: String
    user(id: ID!): User
    users(offset: Int, limit: Int, sortBy: UsersSortInput, filterBy: UserFilterInput): [User]
  }

  type Mutation {
    registerUser(input: RegisterInput!): User!
    updateUser(input: UpdateUserInput!): User!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  input UserFilterInput {
    firstName: String
    lastName: String
    email: String
  }

  enum SortDirection {
    ASC
    DESC
  }

  input UsersSortInput {
    field: String!
    direction: SortDirection!
  }

  input RegisterInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
  }

  input UpdateUserInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
  }
`;
