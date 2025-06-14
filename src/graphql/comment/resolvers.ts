import { Comment } from '@prisma/client';
import { Context } from '../../context/context';
import { CreateCommentInputDto } from '../types/createCommentInputDto';
import CommentService from './service';

export const commentResolvers = {
  Mutation: {
    createComment: (
      _: any,
      args: { input: CreateCommentInputDto },
      context: Context
    ): Promise<Comment> => {
      const commentService = new CommentService(context.prisma);
      return commentService.createComment(args.input);
    },
  },
};
