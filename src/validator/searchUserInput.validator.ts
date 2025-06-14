import { SearchUserInput } from '../graphql/types/searchUserInputDto';
import Validator from './validator';

export const validateSearchUserInput = (
  searchUserInput: SearchUserInput
) => {
  Validator.validateEmail(searchUserInput.email);
};
