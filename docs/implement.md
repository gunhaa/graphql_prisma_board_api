# 구현

- Prisma, TypeScript, apollo-server, mysql를 사용하여 요구사항을 만족하는 GraphQL Server를 구현

## schema

- Prisma를 사용하여 총 3개의 table생성
  - `User`(id, email, password, name, createdAt)
  - `Post`(id, title, content, published, authorId, createdAt)
  - `Comment`(id, content, postId, createdAt)
  - 관계설정
    - User 1 : N Post
    - Post 1 : N Comment

## resolver

- `유저 생성` : createUser();
- `게시글 작성` : createPost();
- `댓글 작성` : createComment();
- `유저의 게시글과 게시글의 댓글 조회` : getUserWithPostsAndComments();
  - `published`와 `content` 값이 입력되지 않은 경우, 기본값으로 `published: true`, `content: "graphql"` 조건이 적용되도록 구현
  - 댓글은 검색된 게시글의 모든 댓글 조회

## seed

- 시드 파일 생성
- resolver들을 검증하기 위한 seed
- 모든 게시글은 0~4개의 댓글을 가지고있음(postId%5)

## logs

- error를 logging을 위한 async logger를 개발하였습니다

## 세부사항

- User - Post - Comment 관계
  - 사용자가 탈퇴하면 해당 사용자가 작성한 게시글과 댓글도 함께 삭제되도록 구현했습니다.
  - 이는 보안 측면에서 더 적절하다고 판단했으며, 추후 `isDeleted` 컬럼을 추가하여 소프트 삭제 방식으로 확장할 수 있다고 생각하여 해당 방식으로 구현하였습니다.

- `getUserWithPostsAndComments()` 쿼리
  - `published`와 `content` 값이 입력되지 않은 경우, 기본값으로 `published: true`, `content: "graphql"` 조건이 적용되도록 구현했습니다. 이를 통해 요구사항을 만족하면서 유연한 검색이 가능하도록 했습니다.
    - `email` , `published?`, `content?` 로 구현하였습니다.
  - 사용자 ID는 외부에 노출되면 보안상 문제가 될 수 있다고 판단하여, 고유하면서도 외부에 안전하게 노출 가능한 `email`을 기준으로 검색하도록 구현했습니다.
