import { CreateCommentInputDto } from '../graphql/types/createCommentInputDto';
import Validator from './validator';

export const validateCreateCommentInput = (
  createCommentInputDto: CreateCommentInputDto
) => {
  Validator.validateId(createCommentInputDto.postId);
  Validator.validateMaxLength(
    createCommentInputDto.content,
    200,
    'content',
    '댓글'
  );
};
