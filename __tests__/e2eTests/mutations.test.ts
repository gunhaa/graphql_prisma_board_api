import prisma from '../../prisma/prisma';
import createApolloServer from '../../src/server/server';
import request from 'supertest';
import bcrypt from 'bcrypt';
import http from 'http';

let app: any;
let testServer: http.Server;

describe('prisma를 통한 Mutation의 동작을 검증한다.', () => {
  beforeAll(async () => {
    let { express, httpServer } = await createApolloServer();
    app = express;
    testServer = httpServer;
  });

  const testEmail1 = 'e2eTest1@test.com';
  it('userResolver.Mutation.createUser의 생성을 검증한다', async () => {
    const testPassword1 = 'e2ee2ee2ee2e';
    const testName = 'e2eTestUser';

    const res = await request(app)
      .post('/graphql')
      .send({
        query: `mutation {
                  createUser(input: {
                    email: "${testEmail1}"
                    password: "${testPassword1}"
                    name: "${testName}"
                  }){
                    email
                    name
                    password
                  }
                }`,
      });

    const match = await bcrypt.compare(
      testPassword1,
      res.body.data.createUser.password
    );
    expect(res.status).toBe(200);
    expect(res.body.data.createUser.email).toBe(testEmail1);
    expect(match).toBe(true);
    expect(res.body.data.createUser.name).toBe(testName);
  });

  const testEmail2 = 'e2eTest2@test.com';
  it('userResolver.Mutation.createUser의 이름을 입력값에 넣지 않은 경우를 검증한다', async () => {
    const testPassword2 = 'e2ee22ee2e';

    const res = await request(app)
      .post('/graphql')
      .send({
        query: `mutation {
                  createUser(input: {
                    email: "${testEmail2}"
                    password: "${testPassword2}"
                  }){
                    email
                    name
                    password
                  }
                }`,
      });

    const match = await bcrypt.compare(
      testPassword2,
      res.body.data.createUser.password
    );
    expect(res.status).toBe(200);
    expect(res.body.data.createUser.email).toBe(testEmail2);
    expect(match).toBe(true);

    // UserService.generateRandomName 검증
    const nameRegex = /^[가-힣]+ [가-힣]+[0-9]{1,4}$/;
    expect(typeof res.body.data.createUser.name).toBe('string');
    expect(nameRegex.test(res.body.data.createUser.name)).toBe(true);
  });

  it('postResolvers.Mutation.createPost의 생성을 검증한다', async () => {
    const title = 'Test Title';
    const content = 'Test Post Content';

    // seed가 5번까지 생성해서 테스트 여러번 가능하도록 5 사용
    const authorId = 5;

    const res = await request(app)
      .post('/graphql')
      .send({
        query: `mutation {
                  createPost(
                    input: {
                      title: "${title}"
                      content: "${content}"
                      authorId: ${authorId}
                    }
                  ) {
                    title
                    content
                    published
                    createdAt
                  }
                }`,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.createPost.title).toBe(title);
    expect(res.body.data.createPost.content).toBe(content);

    // published가 input값으로 들어가지 않았다면 true가 기본값이 된다
    expect(res.body.data.createPost.published).toBe(true);
    expect(typeof res.body.data.createPost.createdAt).toBe('string');
    expect(!isNaN(Date.parse(res.body.data.createPost.createdAt))).toBe(true);
  });

  it('postResolvers.Mutation.createPost의 input에 published: false가 들어간 경우를 검증한다', async () => {
    const title = 'Test Title';
    const content = 'Test Post Content';

    // seed가 5번까지 생성해서 테스트 여러번 가능하도록 5 사용
    const authorId = 5;

    const res = await request(app)
      .post('/graphql')
      .send({
        query: `mutation {
                  createPost(
                    input: {
                      title: "${title}"
                      content: "${content}"
                      authorId: ${authorId}
                      published: false
                    }
                  ) {
                    title
                    content
                    published
                    createdAt
                  }
                }`,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.createPost.title).toBe(title);
    expect(res.body.data.createPost.content).toBe(content);

    // published가 input값으로 들어가서 설정하면, 설정된 값이 들어간다
    expect(res.body.data.createPost.published).toBe(false);
    expect(typeof res.body.data.createPost.createdAt).toBe('string');
    expect(!isNaN(Date.parse(res.body.data.createPost.createdAt))).toBe(true);
  });

  it('commentResolvers.Mutation.createComment의 생성을 검증한다', async () => {
    // seed가 25번까지 생성해서 테스트 여러번 가능하도록 25 사용
    const postId = 25;
    const content = 'Test Comment Content';

    const res = await request(app)
      .post('/graphql')
      .send({
        query: `mutation {
                  createComment(input: {
                    postId: ${postId}
                    content: "${content}"
                  }){
                    content
                    postId
                    createdAt
                  }
                }`,
      });

    expect(res.status).toBe(200);
    expect(res.body.data.createComment.content).toBe(content);
    expect(res.body.data.createComment.postId).toBe(String(postId));
    expect(typeof res.body.data.createComment.createdAt).toBe('string');
    expect(!isNaN(Date.parse(res.body.data.createComment.createdAt))).toBe(
      true
    );
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [testEmail1, testEmail2],
        },
      },
    });

    testServer.close();
  });
});
