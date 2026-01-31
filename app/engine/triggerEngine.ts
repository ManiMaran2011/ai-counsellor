// app/engine/triggerEngine.ts

import type { Task } from "@/app/context/UserContext";
import { triggerTasksOnCompletion } from "./taskTriggers";

/**
 * Central trigger engine
 * Runs AFTER a task is completed
 */
export function applyTriggerEngine(
  completedTaskId: string,
  tasks: Task[]
): Task[] {
  return triggerTasksOnCompletion(completedTaskId, tasks);
}
