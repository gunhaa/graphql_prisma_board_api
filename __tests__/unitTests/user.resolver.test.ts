import {
  mockInput,
  mockUser1,
  mockPostArr,
  mockParent,
} from '../../prisma/mocks/mocksData';

const createUserMock = jest.fn().mockResolvedValue(mockUser1);
const createPostMock = jest.fn().mockResolvedValue(mockPostArr);

jest.mock('../../src/graphql/user/service', () => {
  return jest.fn().mockImplementation(() => ({
    createUser: createUserMock,
    getUserWithPostsAndComments: createUserMock,
    getPostsByUser: createPostMock,
  }));
});

import { userResolvers } from '../../src/graphql/user/resolvers';

describe('user resolver call test', () => {
  it('Mutation.createUser resolver는 UserService.createUser를 호출해야 한다', async () => {
    const result = await userResolvers.Mutation.createUser(
      {},
      { input: mockInput } as any,
      {} as any
    );
    expect(createUserMock).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockUser1);
  });

  it('User.posts resolver는 UserService.getPostsByUser를 호출해야 한다', async () => {
    const result = await userResolvers.User.posts(
      mockParent as any,
      {} as any,
      {} as any
    );
    expect(createPostMock).toHaveBeenCalledWith(mockParent);
    expect(result).toEqual(mockPostArr);
  });

  it('Query.getUserWithPostsAndComments resolver는 UserService.getUserWithPostsAndComments를 호출해야 한다', async () => {
    const result = await userResolvers.Mutation.createUser(
      {},
      { input: mockInput } as any,
      {} as any
    );
    expect(createUserMock).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockUser1);
  });
});
