import { gql } from 'graphql-tag';

export const commentTypeDefs = gql`
  type Comment {
    """
    ID는 부호 없는 고유한 정수값이며, 1부터 시작해 1씩 증가합니다.
    """
    id: ID!

    """
    내용은 반드시 입력되어야 하며 최대 길이 200자 까지 입력할 수 있습니다.
    최소 길이: 1자, 최대 길이: 200자
    """
    content: String!

    """
    댓글이 작성된 게시글의 ID를 나타냅니다.
    """
    postId: String!

    """
    사용자가 생성된 날짜와 시간이 자동으로 기록됩니다.
    """
    createdAt: DateTime
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment
  }

  input CreateCommentInput {
    content: String!
    postId: ID!
  }
`;