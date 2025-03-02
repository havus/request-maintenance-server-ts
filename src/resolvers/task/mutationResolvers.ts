import { PostgresDataSource } from '@/config/typeorm';
import { Task } from '@/entity/Task';
import { mapTaskFields } from '@/utils/task';
import { TaskStatus } from '@/types/task';
import {
  MutationCreateTaskArgs,
  MutationUpdateTaskArgs,
} from '@/types/gql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubsub = new RedisPubSub();

export const mutationResolvers = {
  createTask: async (_parent: any, { input }: MutationCreateTaskArgs) => {
    const { title, description, urgency, status } = input;

    const taskRepository = PostgresDataSource.getRepository(Task);

    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.urgency = Number(urgency || 0);

    if (status === TaskStatus.Resolved) {
      newTask.status = status;
      newTask.resolvedAt = new Date();
    }

    await taskRepository.save(newTask);

    pubsub.publish('TASK_CREATED', {
      taskCreated: newTask,
    });

    return mapTaskFields(newTask);
  },

  updateTask: async (_parent: any, { input }: MutationUpdateTaskArgs) => {
    const { id, title, description, status, urgency } = input;

    const taskRepository = PostgresDataSource.getRepository(Task);

    const existingTask = await taskRepository.findOneBy({ id: Number(id) });

    if (!existingTask) {
      throw new Error(`Task with ID ${id} not found`);
    }

    if (title) existingTask.title = title;
    if (description !== undefined) existingTask.description = description;

    if (status !== undefined) {
      existingTask.status = Number(status)
      if (status === TaskStatus.Resolved) {
        existingTask.resolvedAt = new Date();
      } else {
        existingTask.resolvedAt = null;
      }
    };

    if (urgency !== undefined && urgency !== existingTask.urgency) {
      existingTask.urgency = Number(urgency);
      existingTask.lastUrgencyUpdatedAt = new Date();
    }

    await taskRepository.save(existingTask);

    pubsub.publish('TASK_UPDATED', {
      taskUpdated: existingTask,
    });

    return mapTaskFields(existingTask);
  },
};
