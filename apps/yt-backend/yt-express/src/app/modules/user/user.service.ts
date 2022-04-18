import { UserModel } from './user.model';

export const createUser = (user) => {
  return UserModel.create(user);
};
