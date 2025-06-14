# dev와 prod의 차이
- prod
   - ApolloServerPluginLandingPageProductionDefault()를 사용해 플레이 그라운드를 사용할 수 없는 production 환경으로 서버가 켜집니다.
   - introspection설정이 false로 설정되어 introspection을 확인할 수 없습니다.

- dev
   -  ApolloServerPluginLandingPageLocalDefault({ embed: false }) 옵션을 사용해 apollographql에서 제공해주는 플레이 그라운드를 사용할 수 있습니다.
   - introspection설정이 true로 설정되어 introspection을 확인할 수 있습니다.

# dev

1. dev용 도커 실행(sleep 10)
   - `npm run dev:dockerUp`
2. migration 실행
   - `npm run dev:migrate`
   - 문제 발생시 reset : `npm run dev:reset`
3. 서버 실행
   - `npm run dev`
4. 종료
   - `npm run dev:dockerDown`

# test

1. test용 도커 실행(sleep 10)
   - `npm run test:dockerUp`
2. migration 실행
   - `npm run test:migrate`
   - 문제 발생시 reset : `npm run test:reset`
3. unit test 실행
   - `npm run test:unit`
4. e2e test 실행
   - `npm run test:e2e`
5. 종료
   - `npm run test:dockerDown`

# prod
1. prod용 도커 실행(sleep 10)
    - `npm run prod:dockerUp`
2. migration 실행
    - `npm run prod:migrate`
3. 종료
    - `npm run prod:dockerDown`
4. 리소스 정리
    - `npm run prod:clean`