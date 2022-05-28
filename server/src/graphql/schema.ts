import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    name: String!
    email: String!
    password: String!
    isLogIn: Boolean!
  }

  input AddUserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User]!
    currentUser(email: String!): User
  }

  type Mutation {
    addUser(input: AddUserInput!): User!
    login(email: String!, password: String!): User!
    logout(email: String!): User!
    changePassword(input: AddUserInput!, newPassword: String!): User!
  }
`;

export default typeDefs;
