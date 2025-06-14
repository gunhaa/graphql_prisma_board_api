import PostService from '../../src/graphql/post/service';
import { prismaMock } from '../../prisma/mocks/prisma.mock';

describe('post schema fail test', () => {
  const postService = new PostService(prismaMock);

  it('INVALID_ID_VALUE: authrorId 0보다 작으면 예외를 던져야 한다', async () => {
    const invalidInput = {
      authorId: -22,
      title: '테스트 글',
      content: '내용입니다',
    };

    await expect(
      postService.createPost(invalidInput as any)
    ).rejects.toMatchObject({
      message: 'ID는 0보다 큰 값이어야 합니다.',
      extensions: { code: 'INVALID_ID_VALUE' },
    });
  });

  it('INVALID_ID_FORMAT: authorId가 숫자가 아니라면 예외를 던져야 한다', async () => {
    const invalidInput = {
      authorId: '123a',
      title: '테스트 글',
      content: '내용입니다',
    };

    await expect(
      postService.createPost(invalidInput as any)
    ).rejects.toMatchObject({
      message: 'ID는 양의 정수여야 합니다.',
      extensions: { code: 'INVALID_ID_FORMAT' },
    });
  });

  it('INVALID_USERID_INPUT: 존재하지 않는 유저ID면 예외를 던져야 한다', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const invalidInput = {
      authorId: 125125,
      title: '테스트 글',
      content: '내용입니다',
    };

    await expect(postService.createPost(invalidInput as any)).rejects.toMatchObject({
      message: '존재하지 않는 유저ID 입니다.',
      extensions: { code: 'INVALID_USERID_INPUT' },
    });
  });
});
