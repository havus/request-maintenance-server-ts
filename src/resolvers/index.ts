import { queryResolvers as userQueryResolvers } from './user/queryResolvers';
import { queryResolvers as taskQueryResolvers } from './task/queryResolvers';

import { mutationResolvers as userMutationResolvers } from './user/mutationResolvers';
import { mutationResolvers as taskMutationResolvers } from './task/mutationResolvers';
import Pubsub from '@/config/pubsub';

export const resolvers = {
  Query: {
    ...userQueryResolvers,
    ...taskQueryResolvers,
  },
  Subscription: {
    taskCreated: {
      subscribe: () => Pubsub.asyncIterator('TASK_CREATED'),
    },
    taskUpdated: {
      subscribe: () => Pubsub.asyncIterator('TASK_UPDATED'),
    },
  },
  Mutation: {
    ...userMutationResolvers,
    ...taskMutationResolvers,
  },
};
