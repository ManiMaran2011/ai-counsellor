// app/engine/taskMutation.ts

import type { Task } from "@/app/context/UserContext";

/**
 * Handles task creation when another task is completed.
 * Phase-1 engine: strictly respects Task shape from UserContext.
 */
export function mutateTasksOnCompletion(
  completedTaskId: string,
  existingTasks: Task[]
): Task[] {
  const tasks = [...existingTasks];

  const hasTask = (id: string) =>
    tasks.some((t) => t.id === id);

  // SOP completed → Visa SOP unlocked
  if (completedTaskId === "sop" && !hasTask("visa-sop")) {
    tasks.push({
      id: "visa-sop",
      title: "Draft Visa SOP / Explanation Letter",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  // IELTS completed → Application Fee unlocked
  if (completedTaskId === "ielts" && !hasTask("app-fee")) {
    tasks.push({
      id: "app-fee",
      title: "Pay University Application Fee",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  return tasks;
}
