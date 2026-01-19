import type { Task } from '../types/Task';

export function isTaskComplete(task: Task) {
  return task && task.completed === true;
}
