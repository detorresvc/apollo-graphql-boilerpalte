import '@babel/polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql';

import models from './models';

const context = ({ req }) => {

  const token = req.headers.authorization || ''

  return {
    token,
    models
  }
}

const server = new ApolloServer({ schema, context });
const app = express();
server.applyMiddleware({ app });

// The `listen` method launches a web server.
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
