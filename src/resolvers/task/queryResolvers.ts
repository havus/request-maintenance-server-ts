import { PostgresDataSource } from '@/config/typeorm';
import { Task } from '@/entity/Task';
import { mapTaskFields } from '@/utils/task';
import { QueryTaskArgs, QueryTasksArgs } from '@/types/gql';

export const queryResolvers = {
  task: async (_parent: any, { id }: QueryTaskArgs) => {
    const taskRepository = PostgresDataSource.getRepository(Task);
    const task = await taskRepository.findOneBy({ id: Number(id) });

    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }

    return mapTaskFields(task);
  },

  tasks: async (_parent: any, { offset = 0, limit = 20, sortBy, filterBy }: QueryTasksArgs) => {
    const taskRepository = PostgresDataSource.getRepository(Task);
    const queryBuilder = taskRepository.createQueryBuilder('task');

    if (filterBy) {
      const { title, urgency, status } = filterBy;
      if (title) {
        queryBuilder.andWhere('task.title LIKE :title', { title: `%${title}%` });
      }
      if (urgency) {
        queryBuilder.andWhere('task.urgency = :urgency', { urgency });
      }
      if (status) {
        queryBuilder.andWhere('task.status = :status', { status });
      }
    }

    if (sortBy) {
      queryBuilder.orderBy(`task.${sortBy.field}`, sortBy.direction);
    }
    if (offset) {
      queryBuilder.skip(offset);
    }
    if (limit) {
      queryBuilder.take(limit);
    }

    const tasks = await queryBuilder.getMany();

    return tasks.map(task => (mapTaskFields(task)));
  },
};
