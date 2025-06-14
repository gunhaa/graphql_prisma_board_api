import { Comment, Post, PrismaClient, User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { CreatePostInputDto } from '../types/createPostInputDto';
import { validateCreatePostInput } from '../../validator/createPostInput.validator';
import DataLoader from 'dataloader';
import { ErrorUtil } from '../../util/ErrorUtil';

export default class PostService {
  private prisma;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Post를 생성합니다.
   *
   * 입력값에 대해 다음과 같은 유효성 검사를 수행합니다:
   * - `authorId`가 올바른 양의 정수(ID)인지 확인
   *
   * 유효성 검사를 통과하면 게시글을 데이터베이스에 저장합니다.
   *
   * @param {CreatePostInputDto} createPostInputDto - 생성할 게시글 정보 (title, content, published?, authorId)
   * @returns {Promise<Post>} 생성된 Post
   * @throws {GraphQLError} 입력값이 유효하지 않거나 게시글 생성에 실패한 경우
   */
  public async createPost(
    createPostInputDto: CreatePostInputDto
  ): Promise<Post> {
    // id값 검증
    validateCreatePostInput(createPostInputDto);

    let findUser: User | null;

    try {
      findUser = await this.prisma.user.findUnique({
        where: {
          id: Number(createPostInputDto.authorId),
        },
      });
    } catch (e: unknown) {
      ErrorUtil.throwPrismaError(e);
    }

    if (!findUser) {
      throw new GraphQLError('존재하지 않는 유저ID 입니다.', {
        extensions: {
          code: 'INVALID_USERID_INPUT',
        },
      });
    }

    let result: Promise<Post>;

    try {
      result = this.prisma.post.create({
        data: {
          author: { connect: { id: findUser.id } },
          title: createPostInputDto.title,
          published: createPostInputDto.published ?? true,
          content: createPostInputDto.content,
          createdAt: new Date(),
        },
      });
    } catch (e: unknown) {
      ErrorUtil.throwPrismaError(e);
    }

    return result;
  }

  /**
   * 주어진 Post에 대한 Comment 목록을 DataLoader를 통해 조회합니다.
   *
   * 이 메서드는 GraphQL의 `Post.comments` 필드 resolver로 사용되며,
   * 요청마다 DB에 개별 조회를 발생시키지 않기 위해 DataLoader를 사용합니다
   *
   * @param {Post} parent - Comment를 조회할 대상 Post 객체
   * @param {DataLoader<number, Comment[]>} commentsLoader - postId를 기반으로 댓글을 배치 조회하는 DataLoader
   * @returns {Promise<Comment[]>} Post에 달린 Comment 목록
   */
  public async getCommentsByPost(
    parent: Post,
    commentsLoader: DataLoader<number, Comment[]>
  ) {
    return commentsLoader.load(parent.id);
  }
}
