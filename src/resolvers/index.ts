import { queryResolvers as userQueryResolvers } from './user/queryResolvers';
import { queryResolvers as taskQueryResolvers } from './task/queryResolvers';

import { mutationResolvers as userMutationResolvers } from './user/mutationResolvers';
import { mutationResolvers as taskMutationResolvers } from './task/mutationResolvers';

export const resolvers = {
  Query: {
    ...userQueryResolvers,
    ...taskQueryResolvers,
  },
  Mutation: {
    ...userMutationResolvers,
    ...taskMutationResolvers,
  },
};
