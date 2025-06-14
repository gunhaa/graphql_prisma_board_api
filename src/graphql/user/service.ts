import { Post, PrismaClient, User } from '@prisma/client';
import { CreateUserInputDto } from '../types/createUserInputDto';
import { GraphQLError } from 'graphql';
import { validateCreateUserInput } from '../../validator/createUserInput.validator';
import bcrypt from 'bcrypt';
import { SearchUserInput } from '../types/searchUserInputDto';
import { validateSearchUserInput } from '../../validator/searchUserInput.validator';
import { SearchUserInputResult } from '../types/searchUserInputResult';
import { ErrorUtil } from '../../util/ErrorUtil';

export default class UserService {
  private prisma;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * User를 생성합니다.
   *
   * 입력값에 대해 다음과 같은 유효성 검사를 수행합니다
   * - 이메일 형식 검사
   * - 비밀번호 형식 검사 (8~30자, 영문 + 숫자 필수)
   * - 이름의 최대 길이 검사
   *
   * 유효성 검사를 통과하면 새로운 사용자를 데이터베이스에 저장합니다.
   *
   * @param {CreateUserInputDto} createUserInputDto 생성할 사용자 정보 (email, password, name?)
   * @returns {Promise<User>} 생성된 User
   * @throws {GraphQLError} 입력값이 유효하지 않거나 사용자 생성에 실패한 경우
   */
  public async createUser(
    createUserInputDto: CreateUserInputDto
  ): Promise<User> {
    // email 형식, password 형식(8~30자리, 영어와 숫자는 무조건 포함), 이름 최대길이 검증
    validateCreateUserInput(createUserInputDto);

    let findUser: User | null;
    try {
      findUser = await this.prisma.user.findUnique({
        where: {
          email: createUserInputDto.email,
        },
      });
    } catch (e: unknown) {
      ErrorUtil.throwPrismaError(e);
    }

    if (findUser) {
      throw new GraphQLError('중복된 이메일 입니다.', {
        extensions: {
          code: 'EMAIL_ALREADY_EXIST',
        },
      });
    }

    if (!createUserInputDto.name) {
      createUserInputDto.name = this.generateRandomName();
    }
    // 60자 고정 문자열
    const hashedPassword = await bcrypt.hash(createUserInputDto.password, 10);

    let result: Promise<User>;
    try {
      result = this.prisma.user.create({
        data: {
          email: createUserInputDto.email,
          name: createUserInputDto.name,
          password: hashedPassword,
          createdAt: new Date(),
        },
      });
    } catch (e: unknown) {
      ErrorUtil.throwPrismaError(e);
    }

    return result;
  }

  /**
   * 랜덤한 문자열을 조합하여 이름을 생성합니다.
   *
   * 사용자가 이름을 입력하지 않은 경우 기본값으로 사용됩니다.
   *
   * @returns {string} 랜덤으로 생성된 이름 문자열
   */
  private generateRandomName(): string {
    const prefix = [
      '사진찍는',
      '코딩하는',
      '뜨개질하는',
      '산책하는',
      '연주하는',
      '정리하는',
      '영화보는',
      '요가하는',
      '자전거타는',
      '커피먹는',
    ];
    const suffix = [
      '사람',
      '돼지',
      '소',
      '고양이',
      '강아지',
      '여우',
      '낙타',
      '기러기',
      '꽃사슴',
      '미어캣',
    ];
    const maxNumber = 10000;
    const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
    const randomSuffix = suffix[Math.floor(Math.random() * suffix.length)];
    const randomNumber = Math.floor(Math.random() * maxNumber);

    return `${randomPrefix} ${randomSuffix}${randomNumber}`;
  }

  /**
   * 주어진 검색 조건으로 User를 조회하고, 해당 사용자가 작성한 Post 및 Comment를 함께 조회합니다.
   *
   * 입력값에 대해 다음과 같은 유효성 검사를 수행합니다
   * - 이메일 형식 검사
   *
   * - `published`와 `content`가 입력값에 없다면 기본값이 사용됩니다
   *    - published = true
   *    - content = "graphql"
   * - 게시글과 댓글은 Lazy Loading 방식으로 필드가 실제 요청될 때 개별적으로 조회됩니다.
   *
   * @param {SearchUserInput} searchUserInput 검색 조건 (email, published?, content?)
   * @returns {Promise<SearchUserInputResult>} 검색된 사용자 정보와 연관된 게시글 정보를 포함한 결과
   * @throws {GraphQLError} 사용자가 존재하지 않거나 입력이 유효하지 않은 경우
   */
  public async getUserWithPostsAndComments(
    searchUserInput: SearchUserInput
  ): Promise<SearchUserInputResult> {
    // email 형식 검증
    validateSearchUserInput(searchUserInput);

    let findUser: User | null;
    try {
      findUser = await this.prisma.user.findUnique({
        where: {
          email: searchUserInput.email,
        },
      });
    } catch (e: unknown) {
      ErrorUtil.throwPrismaError(e);
    }

    if (!findUser) {
      throw new GraphQLError('존재하지 않는 유저 이메일 입니다.', {
        extensions: {
          code: 'INVALID_EMAIL_INPUT',
        },
      });
    }

    // 기본 검색 조건 처리 (입력되지 않았을 경우 기본값 적용)
    const published = searchUserInput.published ?? true;
    const content = searchUserInput.content ?? 'graphql';

    return {
      ...findUser,
      _userQuery: {
        published,
        content,
      },
    };
  }

  /**
   * `getUserWithPostsAndComments` resolver의 `User.posts` 필드가
   * 실제 요청될 때 호출되는 메서드입니다.
   * 해당 사용자가 작성한 게시글 목록을 조건에 맞게 조회합니다.
   *
   * @param {SearchUserInputResult} parent - 연관된 User 정보와 검색 조건을 포함한 parent 객체
   * @returns {Promise<Post[]>} 필터링 된 Post 목록
   */
  public async getPostsByUser(parent: SearchUserInputResult): Promise<Post[]> {
    let result: Promise<Post[]>;
    try {
      result = this.prisma.post.findMany({
        where: {
          authorId: parent.id,
          published: parent._userQuery.published,
          content: {
            contains: parent._userQuery.content,
          },
        },
      });
    } catch (e: unknown) {
      ErrorUtil.throwPrismaError(e);
    }

    return result;
  }
}
