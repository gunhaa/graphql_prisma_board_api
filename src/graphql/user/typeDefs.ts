import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    """
    ID는 부호 없는 고유한 정수값이며, 1부터 시작해 1씩 증가합니다.
    """
    id: ID!

    """
    이메일은 고유한 값이며, '@'와 '.'를 포함한 유효한 이메일 형식을 따라야 합니다.
    최대 길이: 100자
    """
    email: String!

    """
    비밀번호는 영문, 숫자, 특수문자의 조합이어야 하며,
    영문과 숫자는 반드시 포함되어야 합니다.
    최소 길이: 8자, 최대 길이: 100자
    """
    password: String!

    """
    이름은 선택 입력 항목이며, 입력하지 않을 경우 자동 생성됩니다.
    최소 길이: 0자, 최대 길이: 30자
    """
    name: String

    """
    사용자가 작성한 게시글 목록을 반환합니다.
    """
    posts: [Post!]!

    """
    사용자가 생성된 날짜와 시간이 자동으로 기록됩니다.
    """
    createdAt: DateTime
  }


  type Query {
    getUserWithPostsAndComments(input: SearchUserInput): User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  input SearchUserInput {
    email: String!
    published: Boolean
    content: String
  }

  input CreateUserInput {
    email: String!
    name: String
    password: String!
  }
`;