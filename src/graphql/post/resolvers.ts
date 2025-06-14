import { Comment, Post } from '@prisma/client';
import { Context } from '../../context/context';
import { CreatePostInputDto } from '../types/createPostInputDto';
import PostService from './service';

export const postResolvers = {
  Post: {
    comments: (parent: Post, _: any, context: Context): Promise<Comment[]> => {
      const postService = new PostService(context.prisma);
      return postService.getCommentsByPost(parent, context.commentsLoader);
    },
  },

  Mutation: {
    createPost: (
      _: any,
      args: { input: CreatePostInputDto },
      context: Context
    ): Promise<Post> => {
      const postService = new PostService(context.prisma);
      return postService.createPost(args.input);
    },
  },
};
