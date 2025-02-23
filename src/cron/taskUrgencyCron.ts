import cron from 'node-cron';
import { PostgresDataSource } from '../config/typeorm';
import { Task } from '../entity/Task';
import { TaskUrgency, TaskStatus } from '../types/task';
import { In } from "typeorm";

// runs every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running Task Urgency Escalation Cron job...');
  const taskRepository = PostgresDataSource.getRepository(Task);
  const tasks = await taskRepository.find({
    where: {
      status: TaskStatus.Open,
      urgency: In([TaskUrgency.LessUrgent, TaskUrgency.Urgent]),
    },
  });

  tasks.forEach(task => {
    const currentTime = new Date();
    const lastUpdatedTime = task.lastUrgencyUpdatedAt || task.createdAt;
    const timeDifference = currentTime.getTime() - lastUpdatedTime.getTime();

    // If urgency is "Less Urgent" (1), escalate to "Urgent" (2) after 3 days
    if (task.urgency === TaskUrgency.LessUrgent && timeDifference >= 3 * 24 * 60 * 60 * 1000) {
      task.urgency = TaskUrgency.Urgent;
      task.lastUrgencyUpdatedAt = currentTime;
    }

    // If urgency is "Urgent" (2), escalate to "Emergency" (3) after 6 hours
    if (task.urgency === TaskUrgency.Urgent && timeDifference >= 6 * 60 * 60 * 1000) {
      task.urgency = TaskUrgency.Emergency;
      task.lastUrgencyUpdatedAt = currentTime;
    }

    taskRepository.save(task);
  });
});

console.log('Task Urgency Escalation Cron Job has been set up');
