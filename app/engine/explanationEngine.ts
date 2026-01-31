// app/engine/explanationEngine.ts

import { Task } from "@/app/context/UserContext";
import { TASK_EXPLANATIONS } from "./taskExplanations";

/**
 * Returns a human-readable explanation for why a task exists
 */
export function getTaskExplanation(task: Task): string {
  // 1️⃣ Explicit predefined explanation
  if (TASK_EXPLANATIONS[task.id]) {
    return TASK_EXPLANATIONS[task.id];
  }

  // 2️⃣ Risk-based explanation
  if (task.risk === "HIGH") {
    return "This is a critical task. Delaying it can significantly reduce your chances of admission.";
  }

  if (task.risk === "MEDIUM") {
    return "This task is important to keep your application on track.";
  }

  // 3️⃣ Fallback
  return "This task is required to progress your application.";
}
