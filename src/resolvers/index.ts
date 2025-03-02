import { queryResolvers as userQueryResolvers } from './user/queryResolvers';
import { queryResolvers as taskQueryResolvers } from './task/queryResolvers';

import { mutationResolvers as userMutationResolvers } from './user/mutationResolvers';
import { mutationResolvers as taskMutationResolvers } from './task/mutationResolvers';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubsub = new RedisPubSub();

export const resolvers = {
  Query: {
    ...userQueryResolvers,
    ...taskQueryResolvers,
  },
  Subscription: {
    taskCreated: {
      subscribe: () => pubsub.asyncIterator('TASK_CREATED'),
    },
    taskUpdated: {
      subscribe: () => pubsub.asyncIterator('TASK_UPDATED'),
    },
  },
  Mutation: {
    ...userMutationResolvers,
    ...taskMutationResolvers,
  },
};
