import UserService from '../../src/graphql/user/service';
import { prismaMock } from '../../prisma/mocks/prisma.mock';

describe('user schema fail test', () => {
  const userService = new UserService(prismaMock);

  describe('createUser 실패 테스트', () => {
    it('INVALID_EMAIL_FORMAT: 이메일 형식이 잘못되면 예외 발생', async () => {
      const invalidInput = {
        email: 'testEmail.com',
        password: 'valid1234',
        name: '홍길동',
      };

      await expect(userService.createUser(invalidInput as any)).rejects.toMatchObject({
        message:
          "이메일 형식이 올바르지 않습니다. '@'를 포함한 유효한 이메일을 입력해주세요.",
        extensions: { code: 'INVALID_EMAIL_FORMAT' },
      });
    });

    it('INVALID_PASSWORD_FORMAT: 비밀번호 형식이 잘못되면 예외 발생', async () => {
      const invalidInput = {
        email: 'valid@email.com',
        password: 'short',
        name: '홍길동',
      };

      await expect(userService.createUser(invalidInput as any)).rejects.toMatchObject({
        message:
          '비밀번호 형식이 올바르지 않습니다. 8~30자의 영문자와 숫자를 포함해야 합니다.',
        extensions: { code: 'INVALID_PASSWORD_FORMAT' },
      });
    });

    it('INVALID_NAME_LENGTH: 이름이 30자를 초과하면 예외 발생', async () => {
      const invalidInput = {
        email: 'valid@email.com',
        password: 'valid1234',
        name: 'e'.repeat(31),
      };

      await expect(userService.createUser(invalidInput as any)).rejects.toMatchObject({
        message:
          '이름의 길이가 올바르지 않습니다. 30자 이하의 이름을(를) 입력해주세요.',
        extensions: { code: 'INVALID_NAME_LENGTH' },
      });
    });

    it('EMAIL_ALREADY_EXIST: 중복된 이메일이면 예외 발생', async () => {
      prismaMock.user.findUnique.mockResolvedValue({ email: 'duplicate@email.com' } as any);

      const invalidInput = {
        email: 'duplicate@email.com',
        password: 'valid1234',
        name: '홍길동',
      };

      await expect(userService.createUser(invalidInput as any)).rejects.toMatchObject({
        message: '중복된 이메일 입니다.',
        extensions: { code: 'EMAIL_ALREADY_EXIST' },
      });
    });
  });

  describe('getUserWithPostsAndComments 실패 테스트', () => {
    it('INVALID_EMAIL_FORMAT: 이메일 형식이 잘못되면 예외 발생', async () => {
      const invalidInput = {
        email: 'testEmail.com',
      };

      await expect(
        userService.getUserWithPostsAndComments(invalidInput as any)
      ).rejects.toMatchObject({
        message:
          "이메일 형식이 올바르지 않습니다. '@'를 포함한 유효한 이메일을 입력해주세요.",
        extensions: { code: 'INVALID_EMAIL_FORMAT' },
      });
    });

    it('INVALID_EMAIL_INPUT: 존재하지 않는 유저 이메일이면 예외 발생', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const input = {
        email: 'notfound@email.com',
      };

      await expect(
        userService.getUserWithPostsAndComments(input as any)
      ).rejects.toMatchObject({
        message: '존재하지 않는 유저 이메일 입니다.',
        extensions: { code: 'INVALID_EMAIL_INPUT' },
      });
    });
  });
});
