import { Post, PrismaClient, User } from '@prisma/client';
import UserService from '../src/graphql/user/service';
import PostService from '../src/graphql/post/service';
import CommentService from '../src/graphql/comment/service';

const prisma = new PrismaClient();

const seed = async () => {
  const users: User[] = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      password: 'alicealice123',
      createdAt: new Date('2021-05-12'),
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      password: 'bobbob123',
      createdAt: new Date('2022-05-12'),
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
      password: 'charlie123',
      createdAt: new Date('2023-05-12'),
    },
    {
      id: 4,
      name: 'Dana',
      email: 'dana@example.com',
      password: 'danadana123',
      createdAt: new Date('2024-05-12'),
    },
    {
      id: 5,
      name: 'Eve',
      email: 'eve@example.com',
      password: 'eveeve123',
      createdAt: new Date('2025-05-12'),
    },
  ];

  const posts: Post[] = [
    // Alice: 모두 공개 + 모두 graphql 포함
    {
      id: 1,
      authorId: 1,
      title: 'A1',
      content: 'GraphQL Introduction',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 2,
      authorId: 1,
      title: 'A2',
      content: 'Advanced GraphQL Concepts',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 3,
      authorId: 1,
      title: 'A3',
      content: 'GraphQL in Practice',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 4,
      authorId: 1,
      title: 'A4',
      content: 'Why I love GraphQL',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 5,
      authorId: 1,
      title: 'A5',
      content: 'GraphQL and REST comparison',
      published: true,
      createdAt: new Date('2025-05-13'),
    },

    // Bob: 모두 공개 + graphql 없음, 모든 글에 REST 포함
    {
      id: 6,
      authorId: 2,
      title: 'B1',
      content: ' Just a REST blog post REST',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 7,
      authorId: 2,
      title: 'B2',
      content: 'REST here',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 8,
      authorId: 2,
      title: 'B3',
      content: 'Some random content REST',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 9,
      authorId: 2,
      title: 'B4',
      content: 'Today I REST learned...',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 10,
      authorId: 2,
      title: 'B5',
      content: 'Another day, REST another post',
      published: true,
      createdAt: new Date('2025-05-13'),
    },

    // Charlie: 모두 비공개 + graphql 포함
    {
      id: 11,
      authorId: 3,
      title: 'C1',
      content: 'Private GraphQL Tips',
      published: false,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 12,
      authorId: 3,
      title: 'C2',
      content: 'Hidden GraphQL Tricks',
      published: false,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 13,
      authorId: 3,
      title: 'C3',
      content: 'GraphQL Deep Dive',
      published: false,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 14,
      authorId: 3,
      title: 'C4',
      content: 'GraphQL Internal Use',
      published: false,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 15,
      authorId: 3,
      title: 'C5',
      content: 'Confidential GraphQL Notes',
      published: false,
      createdAt: new Date('2025-05-13'),
    },

    // Dana: 공개/비공개 섞임, 공개 3개에만 graphql 포함
    {
      id: 16,
      authorId: 4,
      title: 'D1',
      content: 'GraphQL for everyone',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 17,
      authorId: 4,
      title: 'D2',
      content: 'Learning GraphQL',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 18,
      authorId: 4,
      title: 'D3',
      content: 'Secret thoughts',
      published: false,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 19,
      authorId: 4,
      title: 'D4',
      content: 'Random non-GraphQL post',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 20,
      authorId: 4,
      title: 'D5',
      content: 'Private and unrelated',
      published: false,
      createdAt: new Date('2025-05-13'),
    },

    // Eve: 모두 공개, 일부만 graphql 포함
    {
      id: 21,
      authorId: 5,
      title: 'E1',
      content: 'GraphQL is awesome',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 22,
      authorId: 5,
      title: 'E2',
      content: 'Daily journaling',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 23,
      authorId: 5,
      title: 'E3',
      content: 'GraphQL vs REST',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 24,
      authorId: 5,
      title: 'E4',
      content: 'No tech here',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
    {
      id: 25,
      authorId: 5,
      title: 'E5',
      content: 'Frontend meets GraphQL',
      published: true,
      createdAt: new Date('2025-05-13'),
    },
  ];

  const userService = new UserService(prisma);

  for (const user of users) {
    await userService.createUser({
      email: user.email,
      password: user.password,
      name: user.name,
    });
  }

  const postService = new PostService(prisma);

  for (const post of posts) {
    await postService.createPost({
      title: post.title,
      content: post.content as string,
      published: post.published,
      authorId: String(post.authorId),
    });
  }

  const commentService = new CommentService(prisma);

  for (const post of posts) {
    for (let i = 1; i < (post.id % 5) + 1; i++) {
      await commentService.createComment({
        postId: String(post.id),
        content: `comment${i}`,
      });
    }
  }
};

seed()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => prisma.$disconnect);
