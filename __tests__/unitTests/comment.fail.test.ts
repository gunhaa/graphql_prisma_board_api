import CommentService from '../../src/graphql/comment/service';
import { prismaMock } from '../../prisma/mocks/prisma.mock';

describe('comment schema fail test', () => {
  const commentService = new CommentService(prismaMock);

  it('INVALID_ID_VALUE: postId가 0보다 작으면 예외를 던져야 한다', async () => {
    const invalidInput = {
      postId: -324,
      content: '정상 댓글',
    };

    await expect(
      commentService.createComment(invalidInput as any)
    ).rejects.toMatchObject({
      message: 'ID는 0보다 큰 값이어야 합니다.',
      extensions: { code: 'INVALID_ID_VALUE' },
    });
  });

  it('INVALID_ID_FORMAT: postId가 숫자가 아니라면 예외를 던져야 한다', async () => {
    const invalidInput = {
      postId: '32a',
      content: '정상 댓글',
    };

    await expect(
      commentService.createComment(invalidInput as any)
    ).rejects.toMatchObject({
      message: 'ID는 양의 정수여야 합니다.',
      extensions: { code: 'INVALID_ID_FORMAT' },
    });
  });

  it('INVALID_NAME_LENGTH: 200자 이상 content가 입력 되어야 합니다', async () => {
    const invalidInput = {
      postId: 1,
      content: '댓'.repeat(201),
    };

    await expect(
      commentService.createComment(invalidInput as any)
    ).rejects.toMatchObject({
      message:
        '댓글의 길이가 올바르지 않습니다. 200자 이하의 댓글을(를) 입력해주세요.',
      extensions: { code: 'INVALID_CONTENT_LENGTH' },
    });
  });

  it('INVALID_POSTID_INPUT: postId가 존재하지 않는 게시글을 참조해야 합니다', async () => {
    prismaMock.post.findUnique.mockResolvedValue(null);

    const invalidInput = {
      postId: 124512,
      content: '존재하지 않는 게시글',
    };

    await expect(
      commentService.createComment(invalidInput as any)
    ).rejects.toMatchObject({
      message: '존재하지 않는 게시글ID 입니다.',
      extensions: { code: 'INVALID_POSTID_INPUT' },
    });
  });
});
