import { Comment, Post, User } from '@prisma/client';
import { CreateUserInputDto } from '../../src/graphql/types/createUserInputDto';

export const mockUser1: User = {
  id: 1,
  email: 'test1@test.com',
  name: 'test1',
  password: 'testtest1',
  createdAt: new Date('2025-05-13'),
};
export const mockUser2: User = {
  id: 2,
  email: 'test2@test.com',
  name: 'test2',
  password: 'testtest2',
  createdAt: new Date('2025-05-13'),
};
export const mockUser3: User = {
  id: 3,
  email: 'test3@test.com',
  name: 'test3',
  password: 'testtest3',
  createdAt: new Date('2025-05-13'),
};
export const mockInput = {
  test: 'hi',
};
export const mockPost1: Post = {
  id: 1,
  title: 'testTitle',
  content: 'testContent',
  published: true,
  authorId: 1,
  createdAt: new Date('2025-05-13'),
};
export const mockComment: Comment = {
  id: 1,
  content: 'comment1',
  postId: 1,
  createdAt: new Date('2025-05-13'),
};
export const mockPostArr: Post[] = [mockPost1];
export const mockCommentArr: Comment[] = [mockComment];
export const mockParent = {
  test: 'parentMock',
};
export const mockContext = {
  prisma: 'prisma',
  commentsLoader: 'commentsLoader',
};

