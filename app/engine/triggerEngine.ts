// app/engine/triggerEngine.ts

import type { Task } from "@/app/context/UserContext";
import { applyTaskTriggers } from "./taskTriggers";

/**
 * Central trigger engine
 * Runs AFTER a task is completed
 */
export function runTriggerEngine(
  completedTaskId: string,
  tasks: Task[]
): Task[] {
  return applyTaskTriggers(completedTaskId, tasks);
}
