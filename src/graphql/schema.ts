import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userTypeDefs } from './user/typeDefs';
import { postTypeDefs } from './post/typeDefs';
import { commentTypeDefs } from './comment/typeDefs';
import { globalTypeDefs } from './global/typeDefs';
import { userResolvers } from './user/resolvers';
import { postResolvers } from './post/resolvers';
import { commentResolvers } from './comment/resolvers';

export const typeDefs = mergeTypeDefs([
  userTypeDefs,
  postTypeDefs,
  commentTypeDefs,
  globalTypeDefs,
]);

export const resolvers = mergeResolvers([
  userResolvers,
  postResolvers,
  commentResolvers,
]);