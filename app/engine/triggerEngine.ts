// app/engine/triggerEngine.ts

import type { Task } from "@/app/context/UserContext";
import { TASK_TRIGGERS } from "./taskTriggers";

/**
 * Applies task triggers after completion
 */
export function applyTaskTriggers(
  tasks: Task[],
  completedTaskId: string
): Task[] {
  const existingIds = new Set(tasks.map((t) => t.id));
  const next = [...tasks];

  TASK_TRIGGERS.forEach((trigger) => {
    if (
      trigger.whenCompleted === completedTaskId &&
      !existingIds.has(trigger.creates.id)
    ) {
      next.push(trigger.creates);
    }
  });

  return next;
}
