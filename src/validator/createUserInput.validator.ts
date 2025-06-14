import { CreateUserInputDto } from '../graphql/types/createUserInputDto';
import Validator from './validator';

export const validateCreateUserInput = (
  createUserInputDto: CreateUserInputDto
) => {
  Validator.validateEmail(createUserInputDto.email);
  Validator.validateMaxLength(createUserInputDto.name, 30, 'name', '이름');
  Validator.validatePassword(createUserInputDto.password);
};
