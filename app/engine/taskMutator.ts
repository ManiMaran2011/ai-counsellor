// app/engine/taskMutator.ts

import { Task, RiskLevel } from "@/app/context/UserContext";

export type ReasoningOutput = {
  risks: string[];
};

/**
 * Mutate task list based on AI reasoning signals.
 * Keeps Task shape minimal and consistent.
 */
export function mutateTasks(
  existingTasks: Task[],
  aiInsight: ReasoningOutput
): Task[] {
  const tasks = [...existingTasks];

  const hasTask = (id: string) =>
    tasks.some((t) => t.id === id);

  /* ================= SOP RISK ================= */

  if (
    aiInsight.risks.some((r) =>
      r.toLowerCase().includes("sop")
    ) &&
    !hasTask("sop")
  ) {
    tasks.push({
      id: "sop",
      title: "Finalize Statement of Purpose",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  /* ================= IELTS RISK ================= */

  if (
    aiInsight.risks.some((r) =>
      r.toLowerCase().includes("ielts")
    ) &&
    !hasTask("ielts")
  ) {
    tasks.push({
      id: "ielts",
      title: "Submit IELTS Score",
      status: "NOT_STARTED",
      risk: "MEDIUM",
    });
  }

  /* ================= FINANCIAL RISK ================= */

  if (
    aiInsight.risks.some((r) =>
      r.toLowerCase().includes("budget")
    ) &&
    !hasTask("finance-proof")
  ) {
    tasks.push({
      id: "finance-proof",
      title: "Prepare Financial Proof",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  return tasks;
}
