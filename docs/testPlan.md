# Test 계획

## Unit Test

1. Resolver가 올바른 동작을 하고 있는지 테스트한다
   - 각 resolver들이 올바른 service를 호출하고 있는지 테스트한다.
2. 메서드의 에러 반환을 테스트 한다

### Fail Test(Unit test)

#### createUser

- 이메일 형식 오류(UserService.createUser -> validateCreateUserInput())
- 비밀번호 형식 오류(UserService.createUser -> validateCreateUserInput())
- 이름 최대 길이 오류(UserService.creatUser -> validateCreateUserInput())
- 중복된 이메일(UserService.createUser)

#### getUserWithPostsAndComments

- 이메일 형식 오류(UserService.getUserWithPostsAndComments -> validateSearchUserInput())

#### createPost

- ID 형식 오류(PostService.createPost -> validateCreatePostInput())
- 존재하지 않는 유저ID 입력 오류(PostService.createPost)

#### createComment

- ID 형식 오류(CommentService.createComment -> validateCreateCommentInput())
- content 최대 길이 오류(CommentService.createComment -> validateCreateCommentInput())
- 존재하지 않는 POSTID 입력 오류(CommentService.createComment)

## e2e test

1. db와 연동하여 Mutation들의 동작을 검증한다
   - createUser
   - createPost
   - createComment
2. db와 연동하여 getUserWithPostsAndComments의 동작과 연관 리졸버의 동작을 검증한다
   - User.posts
   - Post.comments
3. db와 연동하여 loaders의 동작을 검증한다
