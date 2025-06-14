import { mockComment, mockInput } from '../../prisma/mocks/mocksData';

const createCommentMock = jest.fn().mockResolvedValue(mockComment);

jest.mock('../../src/graphql/comment/service', () => {
  return jest.fn().mockImplementation(() => ({
    createComment: createCommentMock,
  }));
});

import { commentResolvers } from '../../src/graphql/comment/resolvers';

describe('comment resolver call test', () => {
  it('Mutation.createUser resolver는 UserService.createUser를 호출해야 한다', async () => {
    const result = await commentResolvers.Mutation.createComment(
      {},
      { input: mockInput } as any,
      {} as any
    );
    expect(createCommentMock).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockComment);
  });
});
