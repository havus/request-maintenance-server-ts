import { Request, Response } from 'express';
import { GraphQLContext } from './types/context';

export const resolvers = {
  Query: {
    hello: (_: Request, __: Response, context: GraphQLContext) => {
      return `Hello, World! ${context?.token}`;
    },
  },
  Mutation: {
    addUser: (_: any, { name }: { name: string }) => {
      return { id: '1', name };
    },
  },
};
