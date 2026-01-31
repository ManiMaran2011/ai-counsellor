// app/engine/escalationEngine.ts

import type { Task } from "@/app/context/UserContext";

/**
 * Decide whether the system should escalate to human expert help
 */
export function shouldEscalateToExpert({
  tasks,
  confidence,
}: {
  tasks: Task[];
  confidence: number;
}): boolean {
  const hasCriticalPendingTask = tasks.some((t) => {
    const priority = t.priority ?? 99; // safe default for non-critical tasks

    return (
      t.status !== "DONE" &&
      (
        t.category === "SOP" ||
        t.category === "TEST" ||
        priority <= 2
      )
    );
  });

  return hasCriticalPendingTask && confidence < 60;
}
