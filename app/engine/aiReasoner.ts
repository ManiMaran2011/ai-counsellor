// app/engine/aiReasoner.ts

import type { Task } from "@/app/context/UserContext";
import type { RiskLevel } from "./riskEngine";

/* ================================
   AI REASONER OUTPUT
================================ */

export type ReasoningOutput = {
  risks: string[];
  insights: string[];
};

/* ================================
   AI REASONER (DETERMINISTIC)
================================ */

/**
 * This function does NOT mutate state.
 * It only REASONS over current execution state.
 */
export function aiReasoner({
  tasks,
  confidence,
  inactiveDays,
}: {
  tasks: Task[];
  confidence: number;
  inactiveDays: number;
}): ReasoningOutput {
  const risks: string[] = [];
  const insights: string[] = [];

  /* ---------- SOP Risk ---------- */
  const sopTask = tasks.find(t =>
    t.title.toLowerCase().includes("sop")
  );

  if (sopTask && sopTask.status !== "DONE") {
    risks.push(
      "Statement of Purpose is not finalized. This is a critical admission requirement."
    );

    if (inactiveDays > 3) {
      insights.push(
        "You have been inactive on SOP preparation for several days. This may reduce admission competitiveness."
      );
    }
  }

  /* ---------- Confidence Risk ---------- */
  if (confidence < 50) {
    risks.push(
      "Execution confidence is low. Momentum loss increases application risk."
    );
  }

  /* ---------- No Risks ---------- */
  if (risks.length === 0) {
    insights.push(
      "Your application execution is on track. Continue completing high-priority tasks."
    );
  }

  return { risks, insights };
}
