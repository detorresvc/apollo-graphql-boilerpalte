import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { privateResolver } from '../../graphql/resolver-middleware';

const resolvers = {
  Query: {
    customers:  async (_, __, { models }) => {
      const { Customer } = models
      const response = await new Customer().fetchAll();
      return response && response.serialize();
    },
  },
  Mutation: {
    addCustomer: async (_, args, { models }) => {
      
      const { Customer } = models
      const response = await new Customer().save(args.payload);
      if(response)
        return response.serialize()
    }
  }
}


const resolversComposition = {
  'Query.customers': [privateResolver()],
  'Mutation.addCustomer': [privateResolver()],
};

export default composeResolvers(resolvers, resolversComposition);