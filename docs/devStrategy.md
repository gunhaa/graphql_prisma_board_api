# 개발 전략/순서
1. dev 환경 구성
    - docker-compose로 dev용 db container 사용
    - npm script 추가
        - npm run dev:dockerUp
        - npm run dev:dockerDown
    - 서버 실행, 플레이그라운드 확인
2. schema 개발
3. resolver 개발
4. playground를 이용한 쿼리 테스트
5. test환경 분리
6. mock을 이용한 unit test 개발
7. test db를 사용한 e2e test 개발
8. prod 환경 분리
9. 문서 다듬기