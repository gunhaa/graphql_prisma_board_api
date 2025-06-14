import {
  mockCommentArr,
  mockContext,
  mockInput,
  mockParent,
  mockPost1,
} from '../../prisma/mocks/mocksData';

const createCommentsMock = jest.fn().mockResolvedValue(mockCommentArr);
const createPostMock = jest.fn().mockResolvedValue(mockPost1);

jest.mock('../../src/graphql/post/service', () => {
  return jest.fn().mockImplementation(() => ({
    getCommentsByPost: createCommentsMock,
    createPost: createPostMock,
  }));
});

import { postResolvers } from '../../src/graphql/post/resolvers';

describe('post resolver call test', () => {
  it('Post.comments resolver는 PostService.getCommentsByPost를 호출해야 한다', async () => {
    const result = await postResolvers.Post.comments(
      mockParent as any,
      {} as any,
      mockContext as any
    );
    expect(createCommentsMock).toHaveBeenCalledWith(
      mockParent,
      mockContext.commentsLoader
    );

    expect(result).toEqual(mockCommentArr);
  });

  it('Mutation.createPost resolver는 PostService.createPost 호출해야 한다', async () => {
    const result = await postResolvers.Mutation.createPost(
      {} as any,
      { input: mockInput } as any,
      mockContext as any
    );
    expect(createPostMock).toHaveBeenCalledWith(mockInput);

    expect(result).toEqual(mockPost1);
  });
});
