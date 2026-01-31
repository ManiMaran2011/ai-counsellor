// app/engine/explanationEngine.ts

import type { Task } from "@/app/context/UserContext";
import { TASK_EXPLANATIONS } from "./taskExplanations";

/**
 * Returns a human-readable explanation
 * for why a task exists.
 *
 * This is deterministic (non-LLM).
 * Gemini can optionally enhance this later.
 */
export function getTaskExplanation(task: Task): string {
  // 1️⃣ Explicit explanation (highest priority)
  if (TASK_EXPLANATIONS[task.id]) {
    return TASK_EXPLANATIONS[task.id];
  }

  // 2️⃣ Dependency-based explanation
  if (task.dependsOn && task.dependsOn.length > 0) {
    return `This task was unlocked after completing: ${task.dependsOn.join(
      ", "
    )}.`;
  }

  // 3️⃣ Category-based fallback
  switch (task.category) {
    case "SOP":
      return "This task strengthens your academic narrative and improves admission chances.";

    case "TEST":
      return "Standardized test completion is required to meet university eligibility criteria.";

    case "FINANCE":
      return "Financial documentation is mandatory for both admission and visa approval.";

    case "PORTAL":
      return "University portals must be completed accurately to submit your application.";

    case "VISA":
      return "Visa-related preparation is required to legally study abroad.";

    default:
      return "This task is required to progress your application.";
  }
}
