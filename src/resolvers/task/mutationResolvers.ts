import { PostgresDataSource } from '../../config/typeorm';
import { Task } from '../../entity/Task';
import { taskUrgencyMapper, taskStatusMapper } from '../../utils/task';
import { TaskStatus, TaskUrgency } from '../../types/task';
import {
  MutationCreateTaskArgs,
  MutationUpdateTaskArgs,
} from '../../types/gql';

export const mutationResolvers = {
  createTask: async (_parent: any, { input }: MutationCreateTaskArgs) => {
    const { title, description, urgency, status } = input;

    const taskRepository = PostgresDataSource.getRepository(Task);

    const newTask = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.urgency = Number(urgency || 0);
    newTask.status = Number(status || 0);

    await taskRepository.save(newTask);

    return {
      ...newTask,
      status: taskStatusMapper(newTask.status as TaskStatus),
      urgency: taskUrgencyMapper(newTask.urgency as TaskUrgency),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
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
    if (status !== undefined) existingTask.status = Number(status);
    if (urgency !== undefined) existingTask.urgency = Number(urgency);

    await taskRepository.save(existingTask);

    return {
      id: existingTask.id,
      title: existingTask.title,
      description: existingTask.description,
      status: taskStatusMapper(existingTask.status as TaskStatus),
      urgency: taskUrgencyMapper(existingTask.urgency as TaskUrgency),
      createdAt: existingTask.createdAt.toISOString(),
      updatedAt: existingTask.updatedAt.toISOString(),
    };
  },
};
