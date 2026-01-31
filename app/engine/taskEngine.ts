// app/engine/taskEngine.ts

import { Task, Profile, University, RiskLevel } from "@/app/context/UserContext";

/**
 * Generate execution tasks after a university is locked
 */
export function generateTasks({
  profile,
  university,
  existingTasks = [],
}: {
  profile: Profile;
  university: University;
  existingTasks?: Task[];
}): Task[] {
  const tasks: Task[] = [
    {
      id: "sop",
      title: "Finalize Statement of Purpose",
      status: "NOT_STARTED",
      risk: "HIGH",
    },
    {
      id: "ielts",
      title: "Submit IELTS Score",
      status: "NOT_STARTED",
      risk: "MEDIUM",
    },
    {
      id: "fee",
      title: "Pay Application Fee",
      status: "NOT_STARTED",
      risk: "HIGH",
    },
  ];

  return sortTasksByRisk(tasks);
}

/* ================= HELPERS ================= */

function riskWeight(risk: RiskLevel): number {
  if (risk === "HIGH") return 1;
  if (risk === "MEDIUM") return 2;
  return 3;
}

function sortTasksByRisk(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => riskWeight(a.risk) - riskWeight(b.risk)
  );
}
