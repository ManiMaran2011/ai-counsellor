// app/engine/taskTriggers.ts

import type { Task } from "@/app/context/UserContext";

/**
 * Trigger new tasks based on task completion
 * This runs AFTER a task is marked DONE
 */
export function triggerTasksOnCompletion(
  completedTaskId: string,
  existingTasks: Task[]
): Task[] {
  const tasks = [...existingTasks];

  const hasTask = (id: string) =>
    tasks.some((t) => t.id === id);

  /* ================= SOP FLOW ================= */

  if (completedTaskId === "sop-final" && !hasTask("upload-sop")) {
    tasks.push({
      id: "upload-sop",
      title: "Upload SOP PDF to University Portal",
      status: "NOT_STARTED",
      priority: 2,
      category: "PORTAL",
      dependsOn: ["sop-final"],
    });
  }

  /* ================= IELTS FLOW ================= */

  if (completedTaskId === "ielts-submit" && !hasTask("application-fee")) {
    tasks.push({
      id: "application-fee",
      title: "Pay University Application Fee",
      status: "NOT_STARTED",
      priority: 1,
      category: "PORTAL",
      dependsOn: ["bank-proof"],
    });
  }

  return tasks;
}
