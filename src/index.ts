import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import prisma from "./prisma/client";


const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const typeDefs = gql`
    type Query {
      boards: [Board]
    }

    type Board {
    id: ID!
    title: String!
    description: String 
    path: String!
    }
  `;

  const resolvers = {
    Query: {
      boards: () => {
        return prisma.board.findMany()
      }
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
      port: process.env.PORT || 4001,
    },
    () => {
      console.log(`Server listenning on 4001 ${apolloServer.graphqlPath}`);
    }
  );
};

startServer();
