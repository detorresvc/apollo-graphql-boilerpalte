import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { object, string } from 'yup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const {
  AuthenticationError,
  UserInputError
} = require('apollo-server');

const SECRET = 'mysecret'

const schemaValidation = object().shape({
  password: string().required(),
  username: string().required()
})

const resolvers = {
  Query: {
    users: async (_, __, { models }) => {
      const { User } = models
      const response = await new User().fetchAll();
      return response && response.serialize();
    },
  },
  Mutation: {
    login: async (_, args, { User }) => {
    
      return generateToken(args.id, args.username)
    }
  }
}

const generateToken = ({ id, username }) =>
  jwt.sign(
    {
      id,
      username
    },
    SECRET,
    { expiresIn: '1d' }
  );

const inputValidation = () => next =>  async (root, args, context, info) => {
  
  await schemaValidation.validate(args).catch(x => {
    throw new UserInputError(x.errors)
  })
  
  return next(root, args, context, info);
}

const isUserExistAndValidPassword = () => next => async (root, args, context, info) => {
  
  const { username, password } = args
  const { User } = context.models
  
  const response =  await new User().
    where({ username })
    .fetch({ require: false })

  const user = response && response.serialize()
  
  if(!user)
    throw new AuthenticationError('Invalid username or password')

  const match = await bcrypt.compare(password, user.password);
  
  if(!match)
    throw new AuthenticationError('Invalid username or password')

  

  return next(root, { ...args, id: user.id }, context, info);
}

const resolversComposition = {
  'Mutation.login': [inputValidation(), isUserExistAndValidPassword()],
};

export default composeResolvers(resolvers, resolversComposition);
