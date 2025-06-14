import { Comment, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { ErrorUtil } from '../util/ErrorUtil';

export const commentsLoader = (prisma: PrismaClient) =>
  new DataLoader<number, Comment[]>(
    async (postIds: readonly number[]): Promise<Comment[][]> => {
      let comments: Comment[] | null;
      try {
        comments = await prisma.comment.findMany({
          where: { postId: { in: [...postIds] } },
        });
      } catch (e) {
        ErrorUtil.throwPrismaError(e);
      }

      const groupedComments: Record<number, Comment[]> = {};
      for (const comment of comments) {
        if(!groupedComments[comment.postId]){
          groupedComments[comment.postId] = [];
        }
        groupedComments[comment.postId].push(comment);
      }

      const result: Comment[][] = [];
      for (const postId of postIds) {
        result.push(groupedComments[postId] ?? []);
      }

      return result;
    }
  );
