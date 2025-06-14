import { Comment, Post, PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { CreateCommentInputDto } from '../types/createCommentInputDto';
import { validateCreateCommentInput } from '../../validator/createCommentInput.validator';
import { ErrorUtil } from '../../util/ErrorUtil';

export default class CommentService {
  private prisma;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Comment을 생성합니다.
   *
   * 입력값에 대해 다음과 같은 유효성 검사를 수행합니다
   * - `postId` 값이 올바른 양의 정수인지 확인
   * - 댓글 내용(`content`)이 최대 200자를 넘지 않는지 확인
   *
   * 유효성 검사를 통과하면 댓글을 데이터베이스에 저장합니다.
   *
   * @param {CreateCommentInputDto} createCommentInputDto - 생성할 댓글 정보 (postId, content)
   * @returns {Promise<Comment>} 생성된 Comment
   * @throws {GraphQLError} 입력값이 유효하지 않거나 댓글 생성에 실패한 경우
   */
  public async createComment(
    createCommentInputDto: CreateCommentInputDto
  ): Promise<Comment> {
    // postId값 id값 검증, content 최대 길이(200) 검증
    validateCreateCommentInput(createCommentInputDto);

    let findPost: Post | null;

    try {
      findPost = await this.prisma.post.findUnique({
        where: {
          id: Number(createCommentInputDto.postId),
        },
      });
    } catch (e: unknown) {
      ErrorUtil.throwPrismaError(e);
    }

    if (!findPost) {
      throw new GraphQLError('존재하지 않는 게시글ID 입니다.', {
        extensions: {
          code: 'INVALID_POSTID_INPUT',
        },
      });
    }

    let result: Promise<Comment>;

    try {
      result = this.prisma.comment.create({
        data: {
          post: { connect: { id: findPost.id } },
          content: createCommentInputDto.content,
          createdAt: new Date(),
        },
      });
    } catch (e: unknown) {
      ErrorUtil.throwPrismaError(e);
    }

    return result;
  }
}
