export type CreatePostInputDto = {
  title: string;
  content?: string;
  published?: boolean;
  authorId: string;
};