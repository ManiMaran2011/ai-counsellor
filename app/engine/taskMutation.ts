// app/engine/taskMutation.ts

import type { Task } from "@/app/context/UserContext";

/**
 * Mutate tasks when a task is completed.
 * This is deterministic logic (NO AI).
 */
export function mutateTasksOnCompletion(
  completedTaskId: string,
  existingTasks: Task[]
): Task[] {
  const newTasks = [...existingTasks];

  /* ================================
     SOP COMPLETED → VISA SOP
  ================================ */
  if (completedTaskId === "sop-final") {
    const exists = newTasks.some(
      (t) => t.id === "visa-sop"
    );

    if (!exists) {
      newTasks.push({
        id: "visa-sop",
        title: "Draft Visa SOP / Explanation Letter",
        category: "VISA",
        status: "NOT_STARTED",
        priority: 2,
        dependsOn: ["sop-final"],
        risk: "MEDIUM",
      });
    }
  }

  /* ================================
     IELTS COMPLETED → APPLICATION FEE
  ================================ */
  if (completedTaskId === "ielts-submit") {
    const exists = newTasks.some(
      (t) => t.id === "application-fee"
    );

    if (!exists) {
      newTasks.push({
        id: "application-fee",
        title: "Pay University Application Fee",
        category: "PORTAL",
        status: "NOT_STARTED",
        priority: 1,
        risk: "HIGH",
      });
    }
  }

  return newTasks;
}
