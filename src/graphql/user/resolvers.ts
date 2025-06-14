import { Post, User } from '@prisma/client';
import { Context } from '../../context/context';
import { CreateUserInputDto } from '../types/createUserInputDto';
import { SearchUserInput } from '../types/searchUserInputDto';
import UserService from './service';
import { SearchUserInputResult } from '../types/searchUserInputResult';

export const userResolvers = {
  Query: {
    getUserWithPostsAndComments: (
      _: any,
      args: { input: SearchUserInput },
      context: Context
    ): Promise<User> => {
      const userService = new UserService(context.prisma);
      return userService.getUserWithPostsAndComments(args.input);
    },
  },

  User: {
    posts: (parent: SearchUserInputResult, _: any, context: Context): Promise<Post[]> => {
      const userService = new UserService(context.prisma);
      return userService.getPostsByUser(parent);
    },
  },

  Mutation: {
    createUser: (
      _: any,
      args: { input: CreateUserInputDto },
      context: Context
    ) : Promise<User>=> {
      const userService = new UserService(context.prisma);
      return userService.createUser(args.input);
    },
  },
};
