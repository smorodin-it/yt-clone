import { User, UserModel } from './user.model';

export const createUser = (user: Omit<User, 'comparePassword'>) => {
  return UserModel.create(user);
};

export const findUserByEmail = (email: User['email']) => {
  return UserModel.findOne({ email });
};
