import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeType, mergeResolvers } from '@graphql-tools/merge';

import usersResolvers from './resolvers/users';
import customersResolvers from './resolvers/customers';


import usersType from './types/users.gql';
import customersType  from './types/customers.gql';
import query from './types/query.gql';
import mutation from './types/mutation.gql';

import Date from './scalar/date/date';
import DateType from './scalar/date/date.gql';


const typeDefs = mergeType([
  DateType,
  usersType,
  customersType,
  query,
  mutation
]);

const resolvers = mergeResolvers([
  usersResolvers,
  customersResolvers,
  Date
]);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
