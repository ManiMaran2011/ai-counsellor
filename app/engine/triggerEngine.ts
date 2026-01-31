// app/engine/triggerEngine.ts

import type { Task } from "@/app/context/UserContext";
import { triggerTasksOnCompletion } from "./taskTriggers";

/**
 * Apply all task triggers after a task is completed
 * This is the single entry point used by Execution UI
 */
export function applyTaskTriggers(
  completedTaskId: string,
  tasks: Task[]
): Task[] {
  return triggerTasksOnCompletion(completedTaskId, tasks);
}
