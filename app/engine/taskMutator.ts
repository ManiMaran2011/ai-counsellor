// app/engine/taskMutator.ts

import type { Task } from "@/app/context/UserContext";

/**
 * AI-style task mutator based on risk signals.
 * Phase-1 compliant: ONLY uses fields defined in Task.
 */
export function mutateTasks(
  existingTasks: Task[],
  risks: string[]
): Task[] {
  const tasks = [...existingTasks];

  const hasTask = (id: string) =>
    tasks.some((t) => t.id === id);

  /* ===============================
     SOP risk → SOP task
  =============================== */
  if (
    risks.some((r) => r.toLowerCase().includes("sop")) &&
    !hasTask("sop")
  ) {
    tasks.push({
      id: "sop",
      title: "Finalize Statement of Purpose",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  /* ===============================
     IELTS risk → IELTS task
  =============================== */
  if (
    risks.some((r) => r.toLowerCase().includes("ielts")) &&
    !hasTask("ielts")
  ) {
    tasks.push({
      id: "ielts",
      title: "Submit IELTS Score",
      status: "NOT_STARTED",
      risk: "MEDIUM",
    });
  }

  /* ===============================
     Budget risk → Finance task
  =============================== */
  if (
    risks.some((r) => r.toLowerCase().includes("budget")) &&
    !hasTask("finance")
  ) {
    tasks.push({
      id: "finance",
      title: "Prepare Financial Proof",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  return tasks;
}
