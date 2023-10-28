const { gql } = require("apollo-server-express");

const user = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }
  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
  }
  type Token {
    token: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    messages: [Message!]
  }
`;

module.exports = user;