// app/engine/taskEngine.ts

import { Task, RiskLevel, TaskCategory } from "@/app/context/UserContext";

/**
 * Generates initial execution tasks
 * Engines later will enrich / mutate these
 */
export function generateInitialTasks(): Task[] {
  const tasks: Task[] = [
    {
      id: "sop-final",
      title: "Finalize Statement of Purpose",
      status: "NOT_STARTED",
      risk: "HIGH",
      category: "SOP",
      priority: 1,
    },
    {
      id: "ielts-submit",
      title: "Submit IELTS Score",
      status: "NOT_STARTED",
      risk: "MEDIUM",
      category: "TEST",
      priority: 2,
    },
    {
      id: "application-fee",
      title: "Pay Application Fee",
      status: "NOT_STARTED",
      risk: "HIGH",
      category: "PORTAL",
      priority: 3,
    },
  ];

  return tasks;
}
