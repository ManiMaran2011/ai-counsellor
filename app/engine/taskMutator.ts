// app/engine/taskMutator.ts

import type { Task } from "@/app/context/UserContext";

/**
 * Mutates task list safely after actions
 */
export function mutateTasks(
  tasks: Task[],
  completedTaskId: string
): Task[] {
  const exists = (id: string) => tasks.some((t) => t.id === id);

  const next = [...tasks];

  if (completedTaskId === "sop" && !exists("visa-docs")) {
    next.push({
      id: "visa-docs",
      title: "Prepare Visa Documentation",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  return next;
}
