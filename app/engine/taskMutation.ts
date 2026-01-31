// app/engine/taskMutation.ts

import { Task } from "@/app/context/UserContext";

/**
 * Mutate tasks when certain tasks are completed
 * This is deterministic rule-based mutation
 */
export function mutateTasksOnCompletion(
  completedTaskId: string,
  existingTasks: Task[]
): Task[] {
  const tasks = [...existingTasks];

  const hasTask = (id: string) =>
    tasks.some((t) => t.id === id);

  /* ===============================
     SOP COMPLETED → VISA SOP TASK
  =============================== */
  if (completedTaskId === "sop-final" && !hasTask("visa-sop")) {
    tasks.push({
      id: "visa-sop",
      title: "Draft Visa SOP / Explanation Letter",
      status: "NOT_STARTED",
      risk: "HIGH",
      category: "VISA",
      priority: 2,
      dependsOn: ["sop-final"],
    });
  }

  /* ===============================
     IELTS COMPLETED → APPLICATION TASK
  =============================== */
  if (completedTaskId === "ielts-submit" && !hasTask("application-fee")) {
    tasks.push({
      id: "application-fee",
      title: "Pay Application Fee",
      status: "NOT_STARTED",
      risk: "HIGH",
      category: "PORTAL",
      priority: 3,
      dependsOn: ["ielts-submit"],
    });
  }

  return tasks;
}
