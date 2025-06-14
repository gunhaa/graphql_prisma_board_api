import { User } from '@prisma/client';

export type SearchUserInputResult = User & {
  _userQuery: {
    published: boolean;
    content: string;
  };
};
