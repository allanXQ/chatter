const { apolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const express = require("express");

const app = express();
app.disable("x-powered-by");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playGround: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "dark",
    },
  },
});
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log("Apollo Server on http://localhost:4000/graphql");
});
