// app/engine/taskMutator.ts

import type { ReasoningOutput } from "./aiReasoner";
import type { Task } from "@/app/context/UserContext";

/**
 * Mutates tasks based on AI reasoning output.
 * This is rule-based, NOT LLM-driven.
 */
export function mutateTasks(
  existingTasks: Task[],
  aiInsight: ReasoningOutput
): Task[] {
  const tasks = [...existingTasks];

  // Helper
  const hasTask = (id: string) =>
    tasks.some((t) => t.id === id);

  /* ================================
     RULE 1: SOP RISK → SOP TASK
  ================================ */
  if (
    aiInsight.risks.some((r) =>
      r.toLowerCase().includes("sop")
    ) &&
    !hasTask("sop-final")
  ) {
    tasks.push({
      id: "sop-final",
      title: "Finalize Statement of Purpose",
      category: "SOP",
      status: "NOT_STARTED",
      priority: 1,
      risk: "HIGH",
    });
  }

  /* ================================
     RULE 2: IELTS RISK → TEST TASK
  ================================ */
  if (
    aiInsight.risks.some((r) =>
      r.toLowerCase().includes("ielts")
    ) &&
    !hasTask("ielts-submit")
  ) {
    tasks.push({
      id: "ielts-submit",
      title: "Submit IELTS Score",
      category: "TEST",
      status: "NOT_STARTED",
      priority: 2,
      risk: "HIGH",
    });
  }

  /* ================================
     RULE 3: BUDGET RISK → FINANCE TASK
  ================================ */
  if (
    aiInsight.risks.some((r) =>
      r.toLowerCase().includes("budget")
    ) &&
    !hasTask("bank-proof")
  ) {
    tasks.push({
      id: "bank-proof",
      title: "Prepare Financial Proof",
      category: "FINANCE",
      status: "NOT_STARTED",
      priority: 2,
      risk: "MEDIUM",
    });
  }

  return tasks;
}
