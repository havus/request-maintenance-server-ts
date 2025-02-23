import { PostgresDataSource } from '../../config/typeorm';
import { User } from '../../entity/User';
import { QueryUserArgs, QueryUsersArgs } from '../../types/gql';
import { mapUserFields } from '../../utils/user';

export const queryResolvers = {
  user: async (_parent: any, { id }: QueryUserArgs) => {
    const userRepository = PostgresDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: Number(id) });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return mapUserFields(user);
  },

  users: async (_parent: any, { offset = 0, limit = 20, sortBy, filterBy }: QueryUsersArgs) => {
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

    return users.map(user => (mapUserFields(user)));
  },
};
