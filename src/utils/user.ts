import { User } from '../entity/User';

export const mapUserFields = (user: User) => {
  const { hashPassword: _, ...userWithoutHashPassword } = user;

  return {
    ...userWithoutHashPassword,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};
