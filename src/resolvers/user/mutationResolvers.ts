import bcrypt from 'bcryptjs';
import { PostgresDataSource } from '@/config/typeorm';
import { User } from '@/entity/User';
import {
  MutationRegisterUserArgs,
  MutationUpdateUserArgs,
} from '@/types/gql';

import { mapUserFields } from '@/utils/user';

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

    return mapUserFields(newUser);
  },

  updateUser: async (_parent: any, { input }: MutationUpdateUserArgs) => {
    const { id, firstName, lastName, email, password } = input;

    const userRepository = PostgresDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ id: Number(id) });

    if (!existingUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    if (firstName) existingUser.firstName = firstName;
    if (lastName !== undefined) existingUser.lastName = lastName; // to delete last name
    if (email && email !== existingUser.email) {
      const existingUserEmail = await userRepository.findOneBy({ email });

      if (existingUserEmail) {
        throw new Error('Email already in use');
      }

      existingUser.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.hashPassword = hashedPassword;
    }

    await userRepository.save(existingUser);

    return mapUserFields(existingUser);
  },
};
