import { queryResolvers as userQueryResolvers } from './user/queryResolvers';
import { mutationResolvers as userMutationResolvers } from './user/mutationResolvers';

export const resolvers = {
  Query: {
    ...userQueryResolvers,
  },
  Mutation: {
    ...userMutationResolvers,
  },
};
