import { CreatePostInputDto } from '../graphql/types/createPostInputDto';
import Validator from './validator';

export const validateCreatePostInput = (
  createPostInputDto: CreatePostInputDto
) => {
    Validator.validateId(createPostInputDto.authorId);
};
