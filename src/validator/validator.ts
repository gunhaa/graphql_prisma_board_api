import { GraphQLError } from 'graphql';

class Validator {
  private emailRegex;
  private passwordRegex;

  constructor(emailRegex: RegExp, passwordRegex: RegExp) {
    this.emailRegex = emailRegex;
    this.passwordRegex = passwordRegex;
  }

  /**
   * 이메일이 유효한 형식인지 검증합니다.
   * 유효하지 않으면 GraphQLError를 던집니다.
   *
   * @param {string} email - 검사할 이메일 주소
   * @throws {GraphQLError} 이메일 형식이 잘못된 경우
   */
  validateEmail(email: string): void {
    if (!this.emailRegex.test(email)) {
      throw new GraphQLError(
        "이메일 형식이 올바르지 않습니다. '@'를 포함한 유효한 이메일을 입력해주세요.",
        {
          extensions: {
            code: 'INVALID_EMAIL_FORMAT',
          },
        }
      );
    }
  }

  /**
   * 비밀번호가 유효한 형식인지 검증합니다.(8~30자의 영문자와 숫자를 포함)
   * 유효하지 않으면 GraphQLError를 던집니다.
   *
   * @param {string} password - 검사할 비밀번호
   * @throws {GraphQLError} 비밀번호 형식이 잘못된 경우
   */
  validatePassword(password: string): void {
    if (!this.passwordRegex.test(password)) {
      throw new GraphQLError(
        '비밀번호 형식이 올바르지 않습니다. 8~30자의 영문자와 숫자를 포함해야 합니다.',
        {
          extensions: {
            code: 'INVALID_PASSWORD_FORMAT',
          },
        }
      );
    }
  }

  /**
   * 문자열의 최대 길이를 검증합니다.
   * 초과하면 GraphQLError를 던집니다.
   *
   * @param {string | undefined} value - 검사할 문자열 값
   * @param {number} max - 허용 가능한 최대 길이
   * @param {string} engField - 필드 이름(영문, 에러코드용)
   * @param {string} korField - 필드 이름(한글, 에러 메시지용)
   * @throws {GraphQLError} 값의 길이가 초과된 경우
   */
  validateMaxLength(
    value: string | undefined,
    max: number,
    engField: string,
    korField: string
  ): void {
    if (value === undefined) {
      return;
    }
    if (value.length > max) {
      throw new GraphQLError(
        `${korField}의 길이가 올바르지 않습니다. ${max}자 이하의 ${korField}을(를) 입력해주세요.`,
        {
          extensions: {
            code: `INVALID_${engField.toUpperCase()}_LENGTH`,
          },
        }
      );
    }
  }

  /**
   * ID가 양의 정수인지 검증합니다.
   * 숫자가 아니거나 0 이하일 경우 GraphQLError를 던집니다.
   *
   * @param {string} value - 검사할 ID 문자열
   * @throws {GraphQLError} 형식이 잘못되었거나 0 이하인 경우
   */
  validateId(value: string) {
    const num = Number(value);
    if (!Number.isInteger(num)) {
      throw new GraphQLError('ID는 양의 정수여야 합니다.', {
        extensions: {
          code: 'INVALID_ID_FORMAT',
        },
      });
    }

    if (num <= 0) {
      throw new GraphQLError('ID는 0보다 큰 값이어야 합니다.', {
        extensions: {
          code: 'INVALID_ID_VALUE',
        },
      });
    }
  }
}

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/;

export default new Validator(emailRegex, passwordRegex);
