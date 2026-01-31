// app/engine/escalationEngine.ts

import { Task } from "@/app/context/UserContext";

/**
 * Decide whether to escalate user to expert help
 */
export function shouldEscalateToExpert({
  tasks,
  confidence,
}: {
  tasks: Task[];
  confidence: number;
}): boolean {
  // Any high-impact unfinished task
  const hasCriticalPendingTask = tasks.some(
    (t) =>
      t.status !== "DONE" &&
      (t.category === "SOP" ||
        t.category === "TEST" ||
        t.priority <= 2)
  );

  return hasCriticalPendingTask && confidence < 60;
}

