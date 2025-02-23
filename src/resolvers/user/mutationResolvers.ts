import bcrypt from 'bcryptjs';
import { PostgresDataSource } from '../../config/typeorm';
import { User } from '../../entity/User';
import {
  MutationRegisterUserArgs,
  MutationUpdateUserArgs,
} from '../../types/gql';

export const mutationResolvers = {
  registerUser: async (_parent: any, { input }: MutationRegisterUserArgs) => {
    const { firstName, lastName, email, password } = input;

    const userRepository = PostgresDataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    newUser.firstName = firstName;
    newUser.lastName = lastName || null;
    newUser.email = email;
    newUser.hashPassword = hashedPassword;

    await userRepository.save(newUser);

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt.toISOString(),
      updatedAt: newUser.updatedAt.toISOString(),
    };
  },
};
