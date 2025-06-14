import { gql } from 'graphql-tag';

export const postTypeDefs = gql`
  type Post {
    """
    ID는 부호 없는 고유한 정수값이며, 1부터 시작해 1씩 증가합니다.
    """
    id: ID!

    """
    제목은 최소 1글자 이상 입력해야 합니다.
    최소 길이: 1자, 최대 길이: 100자
    """
    title: String!

    """
    내용은 없으면 빈 값으로 들어가며, 최대 1000자 까지 입력할 수 있습니다.
    최소 길이: 0자, 최대 길이: 1000자
    """
    content: String!

    """
    값이 입력되지 않으면 기본값으로 true가 설정됩니다.
    """
    published: Boolean

    """
    게시글을 작성한 작성자의 ID를 나타냅니다.
    """
    authorId: ID!

    """
    게시글의 댓글 목록을 반환합니다.
    """
    comments: [Comment!]!

    """
    게시글이 작성된 날짜와 시간이 자동으로 기록됩니다.
    """
    createdAt: DateTime
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post
  }

  input CreatePostInput {
    title: String!,
    content: String,
    published: Boolean,
    authorId: ID,
  }
`;