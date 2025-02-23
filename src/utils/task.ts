import { Task } from '../entity/Task';
import { TaskUrgency, TaskStatus } from '../types/task';

export const taskUrgencyMapper = (urgency: TaskUrgency): string => {
  switch (urgency) {
    case TaskUrgency.NoneUrgent:
      return 'None Urgent';
    case TaskUrgency.LessUrgent:
      return 'Less Urgent';
    case TaskUrgency.Urgent:
      return 'Urgent';
    case TaskUrgency.Emergency:
      return 'Emergency';
    default:
      return 'Unknown';
  }
};

export const taskStatusMapper = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.Open:
      return 'Open';
    case TaskStatus.Resolved:
      return 'Resolved';
    default:
      return 'Unknown';
  }
};

export const mapTaskFields = (task: Task) => {
  return {
    ...task,
    status: taskStatusMapper(task.status as TaskStatus),
    urgency: taskUrgencyMapper(task.urgency as TaskUrgency),
    resolvedAt: task.resolvedAt?.toISOString(),
    lastUrgencyUpdatedAt: task.lastUrgencyUpdatedAt.toISOString(),
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
};
