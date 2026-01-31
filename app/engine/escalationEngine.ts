// app/engine/escalationEngine.ts

import { Task, RiskLevel } from "@/app/context/UserContext";

/**
 * Decide whether the user should be escalated to an expert.
 *
 * Rules:
 * - Any HIGH risk task not completed
 * - Confidence below threshold
 */
export function shouldEscalateToExpert({
  tasks,
  confidence,
}: {
  tasks: Task[];
  confidence: number;
}): boolean {
  const hasHighRiskPendingTask = tasks.some(
    (t) => t.status !== "DONE" && t.risk === "HIGH"
  );

  return hasHighRiskPendingTask && confidence < 60;
}
