// app/engine/taskMutator.ts

import { Task } from "@/app/context/UserContext";
import { ReasoningOutput } from "./aiReasoner";

/**
 * Mutate task list based on AI reasoning output
 * This does NOT execute tasks — only injects them
 */
export function mutateTasks(
  existingTasks: Task[],
  aiInsight: ReasoningOutput
): Task[] {
  const tasks = [...existingTasks];

  const hasTask = (id: string) =>
    tasks.some((t) => t.id === id);

  /* ================================
     SOP RISK → SOP TASK
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
      status: "NOT_STARTED",
      risk: "HIGH",
      category: "SOP",
      priority: 1,
    });
  }

  /* ================================
     IELTS RISK → IELTS TASK
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
      status: "NOT_STARTED",
      risk: "MEDIUM",
      category: "TEST",
      priority: 2,
    });
  }

  /* ================================
     FINANCIAL RISK → BANK PROOF TASK
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
      status: "NOT_STARTED",
      risk: "HIGH",
      category: "FINANCE",
      priority: 2,
    });
  }

  return tasks;
}
