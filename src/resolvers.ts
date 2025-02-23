import bcrypt from 'bcryptjs';
import { GraphQLResolveInfo } from 'graphql';
import { User } from './entity/User';
import { PostgresDataSource } from './config/typeorm';
import { GraphQLContext } from './types/context';
import {
  MutationRegisterUserArgs,
  QueryUserArgs,
  QueryUsersArgs,
} from './types/gql';

export const resolvers = {
  Query: {
    hello: (
      parent: any,
      args: Record<string, any>,
      context: GraphQLContext,
      info: GraphQLResolveInfo
    ) => {
      console.log('parent:', parent);
      console.log('args:', args);
      console.log('context:', context);
      console.log('info:', info);

      return `Hello, World! ${context?.token}`;
    },
    user: async (
      _parent: any,
      { id }: QueryUserArgs,
      _context: GraphQLContext,
      _info: GraphQLResolveInfo
    ) => {
      const userRepository = PostgresDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: Number(id) });

      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }

      return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      };
    },
    users: async (
      _parent: any,
      { offset = 0, limit = 20, sortBy, filterBy }: QueryUsersArgs,
      _context: GraphQLContext,
      _info: GraphQLResolveInfo,
    ) => {
      const userRepository = PostgresDataSource.getRepository(User);
      const queryBuilder = userRepository.createQueryBuilder('user');

      if (filterBy) {
        const { firstName, lastName, email } = filterBy;
        if (firstName) {
          queryBuilder.andWhere('user.firstName LIKE :firstName', { firstName: `%${firstName}%` });
        }
        if (lastName) {
          queryBuilder.andWhere('user.lastName LIKE :lastName', { lastName: `%${lastName}%` });
        }
        if (email) {
          queryBuilder.andWhere('user.email LIKE :email', { email: `%${email}%` });
        }
      }

      if (sortBy) {
        queryBuilder.orderBy(`user.${sortBy.field}`, sortBy.direction);
      }
      if (offset) {
        queryBuilder.skip(offset);
      }
      if (limit) {
        queryBuilder.take(limit);
      }

      const users = await queryBuilder.getMany();

      const usersWithStringDates = users.map(user => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }));
    
      return usersWithStringDates;
    },
  },
  Mutation: {
    registerUser: async (
      _parent: any,
      { input }: MutationRegisterUserArgs,
      _context: GraphQLContext,
      _info: GraphQLResolveInfo
    ) => {
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
  },
};
