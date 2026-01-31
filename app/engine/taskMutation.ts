// app/engine/taskMutation.ts

import { Task } from "@/app/context/UserContext";

/**
 * Mutate tasks AFTER a task is completed.
 * This keeps the task model minimal and stable.
 */
export function mutateTasksOnCompletion(
  completedTaskId: string,
  existingTasks: Task[]
): Task[] {
  const tasks = [...existingTasks];

  const hasTask = (id: string) =>
    tasks.some((t) => t.id === id);

  /* ================= SOP → VISA SOP ================= */

  if (completedTaskId === "sop" && !hasTask("visa-sop")) {
    tasks.push({
      id: "visa-sop",
      title: "Draft Visa SOP / Explanation Letter",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  /* ================= IELTS → APPLICATION FEE ================= */

  if (completedTaskId === "ielts" && !hasTask("fee")) {
    tasks.push({
      id: "fee",
      title: "Pay Application Fee",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  return tasks;
}
