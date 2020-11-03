
import jwt from 'jsonwebtoken';
import moment from 'moment';

const {
  ForbiddenError
} = require('apollo-server');
const SECRET = 'mysecret'

export const privateResolver = () => next => async (root, args, context, info) => {
  
  const bearer = context.token.split(' ');
  const token = bearer[1];
  if(!token)
    throw new ForbiddenError('Access Denied!')

  try{
    const isVerified = await jwt.verify(token, SECRET)
    if(!isVerified)
      throw new ForbiddenError('Access Denied!')
  }catch(e){
    throw new ForbiddenError('Access Denied!')
  }

  return next(root, args, context, info);
}
