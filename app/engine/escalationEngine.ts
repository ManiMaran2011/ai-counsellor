// app/engine/escalationEngine.ts

import type { Task } from "@/app/context/UserContext";

/**
 * Determines if expert escalation is required
 */
export function shouldEscalate(
  tasks: Task[],
  confidence: number
): boolean {
  const hasHighRiskPending = tasks.some(
    (t) => t.status !== "DONE" && t.risk === "HIGH"
  );

  return hasHighRiskPending && confidence < 60;
}
