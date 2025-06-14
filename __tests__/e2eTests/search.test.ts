import prisma from '../../prisma/prisma';
import createApolloServer from '../../src/server/server';
import request from 'supertest';
import http from 'http';

let app: any;
let testServer: http.Server;

describe('prisma를 통해 userResolvers의 쿼리 getUserWithPostsAndComments를 검증한다.', () => {
  beforeAll(async () => {
    let { express, httpServer } = await createApolloServer();
    app = express;
    testServer = httpServer;
  });

  // 기본값 검증
  // input에 값이 없다면 기본값인 content: graphql, published: true로 들어가는 것을 검증한다
  it('seed Alice@example.com의 게시글을 기본값 조건(published: true, content: "graphql")으로 조회했을 때, 5개의 글이 반환된다', async () => {
    const email = 'alice@example.com';
    const content = 'graphql';
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `query getUserWithPostsAndComments{
                  getUserWithPostsAndComments(input: {
                    email: "${email}"
                  }) {
                    id
                    name
                    password
                    email
                    createdAt
                    posts {
                      id
                      authorId
                      title
                      content
                      published
                      createdAt
                      comments {
                        id
                        postId
                        content
                        createdAt
                      }
                    }
                  }
                }`,
      });

    expect(res.status).toBe(200);

    const alice = res.body.data.getUserWithPostsAndComments;

    expect(alice.email.toLowerCase()).toBe(email.toLowerCase());
    expect(typeof alice.name).toBe('string');

    expect(Array.isArray(alice.posts)).toBe(true);
    expect(alice.posts.length).toBe(5);

    for (const post of alice.posts) {
      expect(post.published).toBe(true);

      expect(post.content.toLowerCase()).toContain(content.toLowerCase());

      expect(Array.isArray(post.comments)).toBe(true);

      for (const comment of post.comments) {
        expect(typeof comment.content).toBe('string');
        expect(typeof comment.createdAt).toBe('string');
        expect(!isNaN(Date.parse(comment.createdAt))).toBe(true);
      }
    }
  });

  // published: false 조건이 적용되어, Charlie@example.com의 비공개 게시글만 조회되는지 검증한다.
  it('published: false, content: "graphql"(기본값) 조건으로 Charlie@example.com의 게시글 5개가 반환되는지 검증한다', async () => {
    const email = 'charlie@example.com';
    const content = 'graphql';
    const published = false;
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `query getUserWithPostsAndComments{
                  getUserWithPostsAndComments(input: {
                    email: "${email}"
                    published: ${published}
                  }) {
                    id
                    name
                    password
                    email
                    createdAt
                    posts {
                      id
                      authorId
                      title
                      content
                      published
                      createdAt
                      comments {
                        id
                        postId
                        content
                        createdAt
                      }
                    }
                  }
                }`,
      });

    expect(res.status).toBe(200);

    const charlie = res.body.data.getUserWithPostsAndComments;

    expect(charlie.email.toLowerCase()).toBe(email.toLowerCase());
    expect(typeof charlie.name).toBe('string');

    expect(Array.isArray(charlie.posts)).toBe(true);
    expect(charlie.posts.length).toBe(5);

    for (const post of charlie.posts) {
      expect(post.published).toBe(published);

      expect(post.content.toLowerCase()).toContain(content.toLowerCase());

      expect(Array.isArray(post.comments)).toBe(true);

      for (const comment of post.comments) {
        expect(typeof comment.content).toBe('string');
        expect(typeof comment.createdAt).toBe('string');
        expect(!isNaN(Date.parse(comment.createdAt))).toBe(true);
      }
    }
  });

  // content: "rest", published: true 조건이 적용되어, Bob@example.com의 비공개 게시글이 정상 조회되는지 검증한다.
  it('published: true(기본값), content: "rest" 조건으로 Bob@example.com의 게시글 5개가 반환되는지 검증한다', async () => {
    const email = 'Bob@example.com';
    const content = 'rest';
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `query getUserWithPostsAndComments{
                    getUserWithPostsAndComments(input: {
                      email: "${email}"
                      content: "${content}"
                    }) {
                      id
                      name
                      password
                      email
                      createdAt
                      posts {
                        id
                        authorId
                        title
                        content
                        published
                        createdAt
                        comments {
                          id
                          postId
                          content
                          createdAt
                        }
                      }
                    }
                  }`,
      });

    expect(res.status).toBe(200);

    const bob = res.body.data.getUserWithPostsAndComments;

    expect(bob.email.toLowerCase()).toBe(email.toLowerCase());
    expect(typeof bob.name).toBe('string');

    expect(Array.isArray(bob.posts)).toBe(true);
    expect(bob.posts.length).toBe(5);

    for (const post of bob.posts) {
      expect(post.published).toBe(true);

      expect(post.content.toLowerCase()).toContain(content.toLowerCase());

      expect(Array.isArray(post.comments)).toBe(true);

      for (const comment of post.comments) {
        expect(typeof comment.content).toBe('string');
        expect(typeof comment.createdAt).toBe('string');
        expect(!isNaN(Date.parse(comment.createdAt))).toBe(true);
      }
    }
  });

  afterAll(async () => {
    testServer.close();
  });
});
