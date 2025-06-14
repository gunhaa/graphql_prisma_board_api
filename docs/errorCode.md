# 에러코드 정리

## User

### createUser

- 이메일 형식 오류(UserService.createUser -> validateCreateUserInput())
  - "message": "이메일 형식이 올바르지 않습니다. '@'를 포함한 유효한 이메일을 입력해주세요.",
  - "code": "INVALID_EMAIL_FORMAT"
- 비밀번호 형식 오류(UserService.createUser -> validateCreateUserInput())
  - "message": "비밀번호 형식이 올바르지 않습니다. 8~30자의 영문자와 숫자를 포함해야 합니다.",
  - "code": "INVALID_PASSWORD_FORMAT"
- 이름 최대 길이 오류(UserService.creatUser -> validateCreateUserInput())
  - "message": "이름의 길이가 올바르지 않습니다. 30자 이하의 이름을(를) 입력해주세요.",
  - "code": "INVALID_NAME_LENGTH"
- 중복된 이메일(UserService.createUser)
  - "message": "중복된 이메일 입니다."
  - "code": "EMAIL_ALREADY_EXIST"

## getUserWithPostsAndComments

- 이메일 형식 오류(UserService.getUserWithPostsAndComments -> validateSearchUserInput())
  - "message": "이메일 형식이 올바르지 않습니다. '@'를 포함한 유효한 이메일을 입력해주세요.",
  - "code": "INVALID_EMAIL_FORMAT"
- 존재하지 않는 유저 이메일(UserService.getUserWithPostsAndComments)
  - "message": "존재하지 않는 유저 이메일 입니다.",
  - "code": "INVALID_EMAIL_INPUT"

## Post

### createPost

- ID 형식 오류(PostService.createPost -> validateCreatePostInput())
  - "message": "ID는 양의 정수여야 합니다."
  - "code" : "INVALID_ID_FORMAT"
- 존재하지 않는 USERID 입력 오류(PostService.createPost)
  - "message": "존재하지 않는 유저ID 입니다."
  - "code" : "INVALID_USERID_INPUT"

## Comment

### createComment

- ID 형식 오류(CommentService.createComment -> validateCreateCommentInput())
  - example input = '321a'
  - "message": "ID는 양의 정수여야 합니다."
  - "code" : "INVALID_ID_FORMAT"
- ID 형식 오류(CommentService.createComment -> validateCreateCommentInput())
  - example input = -324
  - "message": "ID는 0보다 큰 값이어야 합니다."
  - "code" : "INVALID_ID_VALUE"
- content 최대 길이 오류(CommentService.createComment -> validateCreateCommentInput())
  - "message": "댓글의 길이가 올바르지 않습니다. 200자 이하의 댓글을(를) 입력해주세요.",
  - "code": "INVALID_CONTENT_LENGTH"
- 존재하지 않는 POSTID 입력 오류(CommentService.createComment)
  - "message": "존재하지 않는 게시글ID 입니다."
  - "code": "INVALID_POSTID_INPUT"

## Server

- 예상치 못한 서버 오류
  - "message": "예상치 못한 서버 내부 오류입니다. 잠시 후 다시 시도해 주세요."
  - "code": "INTERNAL_SERVER_ERROR"

## DB

- DB 오류
  - "message" : "데이터베이스 오류 입니다. 잠시 후 다시 시도해주세요."
  - "code": "DB_ERROR"