import { GraphQLError } from "graphql";

export class ErrorUtil {

    public static throwPrismaError(e: unknown): never {
        if (e instanceof Error) {
          throw new GraphQLError('데이터베이스 오류입니다.', {
            extensions: {
              code: 'DB_ERROR',
              detail: ErrorUtil.parsePrismaError(e.stack ?? 'No stack trace'),
            },
          });
        } else {
          throw new GraphQLError('예상치 못한 서버 내부 오류입니다.', {
            extensions: {
              code: 'INTERNAL_SERVER_ERROR',
              detail: String(e),
            },
          });
        }
      }

    private static parsePrismaError(error: string): string {
        const errorClass = error.split(":")[0] ?? 'unknownError';
        return errorClass;
    }
}
