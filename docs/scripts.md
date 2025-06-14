# 스크립트 정리

| Script 이름         | 사용 명령어                                                                                             | 사용 환경파일      | 설명 |
|----------------------|----------------------------------------------------------------------------------------------------------|---------------------|------|
| `prod:dockerUp`      | `docker-compose --env-file .env.prod -f docker-compose.yml -f docker-compose.override.prod.yml up -d`    | `.env.prod`         | 운영 환경의 Docker 컨테이너를 실행합니다 |
| `prod:migrate`       | `docker-compose exec app npx prisma migrate deploy`                                                     | `.env.prod`         | 운영 DB에 마이그레이션을 적용합니다 |
| `prod:dockerDown`    | `docker-compose down --remove-orphans`                                                                  | N/A                 | 운영 컨테이너 및 네트워크를 정리합니다 |
| `prod:clean`       | `docker-compose -f docker-compose.yml -f docker-compose.override.prod.yml down --remove-orphans -v`      | `.env.prod`         | 프로덕션 Docker 리소스를 완전히 정리합니다 |
| `dev`                | `nodemon --watch src --ext ts --exec ts-node src/index.ts`                                              | `.env`              | 개발 환경에서 실시간 코드 변경 반영으로 서버 실행 |
| `dev:dockerUp`       | `docker-compose up -d`                                                                                   | `.env`              | 개발용 Docker 컨테이너 실행 |
| `dev:migrate`        | `npx prisma migrate dev --name dev`                                                                     | `.env`              | 개발 환경에서 Prisma 마이그레이션 실행 |
| `dev:reset`          | `npx prisma migrate reset`                                                                               | `.env`              | 개발 DB를 초기화하고 마이그레이션 적용 |
| `dev:dockerDown`     | `docker-compose down -v`                                                                                 | N/A                 | 개발용 컨테이너와 볼륨 정리 |
| `test`               | `dotenv -e .env.test -- nodemon --watch src --ext ts --exec ts-node src/index.ts`                       | `.env.test`         | 테스트 환경에서 서버 실행 |
| `test:dockerUp`      | `docker-compose --env-file .env.test up -d`                                                              | `.env.test`         | 테스트용 Docker 컨테이너 실행 |
| `test:reset`         | `npx dotenv-cli --e .env.test -- prisma migrate reset`                                                   | `.env.test`         | 테스트 DB 초기화 |
| `test:migrate`       | `npx dotenv-cli --e .env.test -- prisma migrate dev --name test`                                         | `.env.test`         | 테스트 환경에 Prisma 마이그레이션 실행 |
| `test:unit`          | `jest --config=jest-unit.config.js --coverage`                                                           | `.env.test`         | 단위 테스트 실행 및 커버리지 측정 |
| `test:e2e`           | `npx dotenv-cli --e .env.test -- jest --config=jest-e2e.config.js --coverage`                            | `.env.test`         | 통합 테스트(E2E) 실행 및 커버리지 측정 |
| `test:dockerDown`    | `docker-compose down -v`                                                                                 | N/A                 | 테스트 환경 컨테이너와 볼륨 제거 |

