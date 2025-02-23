import { PostgresDataSource } from '../../config/typeorm';
import { Task } from '../../entity/Task';
import { taskUrgencyMapper, taskStatusMapper } from '../../utils/task';
import { TaskStatus, TaskUrgency } from '../../types/task';
import {
  MutationCreateTaskArgs,
} from '../../types/gql';

export const mutationResolvers = {
  createTask: async (_parent: any, { input }: MutationCreateTaskArgs) => {
    const { title, description, urgency, status } = input;

    const taskRepository = PostgresDataSource.getRepository(Task);

    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.urgency = urgency || 0;
    newTask.status = status || 0;

    await taskRepository.save(newTask);

    return {
      ...newTask,
      status: taskStatusMapper(newTask.status as TaskStatus),
      urgency: taskUrgencyMapper(newTask.urgency as TaskUrgency),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};
