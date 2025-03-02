export const typeDefs = `
  type Query {
    hello: String

    user(id: ID!): User
    users(offset: Int, limit: Int, sortBy: SortInput, filterBy: UserFilterInput): [User]

    task(id: ID!): Task
    tasks(offset: Int, limit: Int, sortBy: SortInput, filterBy: TaskFilterInput): [Task]
  }

  type Mutation {
    registerUser(input: RegisterInput!): User!
    updateUser(input: UpdateUserInput!): User!

    createTask(input: CreateTaskInput!): Task!
    updateTask(input: UpdateTaskInput!): Task!
  }

  type Subscription {
    taskCreated: Task
    taskUpdated: Task
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  enum SortDirection {
    ASC
    DESC
  }

  input SortInput {
    field: String!
    direction: SortDirection!
  }

  input UserFilterInput {
    firstName: String
    lastName: String
    email: String
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




  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    urgency: String!
    resolvedAt: String
    createdAt: String!
    updatedAt: String!
    lastUrgencyUpdatedAt: String!
  }

  input CreateTaskInput {
    title: String!
    description: String
    urgency: Int
    status: Int
  }

  input TaskFilterInput {
    title: String
    status: Int
    urgency: Int
  }

  input UpdateTaskInput {
    id: Int!
    title: String
    description: String
    status: Int
    urgency: Int
  }
`;
