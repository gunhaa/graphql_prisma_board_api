import prisma from '../../prisma/prisma';
import createApolloServer from '../../src/server/server';
import request from 'supertest';
import http from 'http';

let app: any;
let testServer: http.Server;
// let prisma;

describe('dataloader를 이용한 getUserWithPostsAndComments의 쿼리 최적화를 검증한다.', () => {
  let commentQueryCount = 0;

  beforeAll(async () => {
    let { express, httpServer } = await createApolloServer();
    app = express;
    testServer = httpServer;

    prisma.$use(async (params, next) => {
      if (params.model === 'Comment' && params.action === 'findMany') {
        commentQueryCount++;
      }
      return next(params);
    });
  });

  it('Alice@example.com의 게시글에 대한 Comment 쿼리 호출 횟수는 1회여야 한다 (DataLoader)', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `query {
          getUserWithPostsAndComments(input: {
            email: "alice@example.com"
          }) {
            posts {
              comments {
                content
              }
            }
          }
        }`,
      });

    expect(res.status).toBe(200);
    expect(commentQueryCount).toBe(1);
    const posts = res.body.data.getUserWithPostsAndComments.posts;
    let commentCount = 0;
    for (const post of posts) {
      for (const comment of post.comments) {
        commentCount++;
      }
    }

    // comment의 수는 seed가 가진 5개의 post가 0,1,2,3,4의 댓글 수를 가져 총 합은 10
    expect(commentCount).toBe(10);
  });

  afterAll(async () => {
    testServer.close();
  });
});
