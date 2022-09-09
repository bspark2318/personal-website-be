import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => "Hello World",
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/api",
  });

  httpServer.listen(
    {
      port: process.env.PORT || 4000,
    },
    () => {
      console.log(`Server listenning on 4000: ${apolloServer.graphqlPath}`);
    }
  );
};

startServer();
