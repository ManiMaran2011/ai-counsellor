// app/engine/taskTemplates.ts

import type { Profile, University } from "@/app/context/UserContext";

/* ================= TYPES ================= */

export type TaskCategory =
  | "SOP"
  | "TEST"
  | "FINANCE"
  | "PORTAL"
  | "VISA";

export type TaskTemplate = {
  id: string;
  category: TaskCategory;
  title: string;

  // Decision logic
  requiredIf: (profile: Profile, university: University) => boolean;

  // Execution metadata
  priority: number; // lower = higher priority
  blocking?: boolean;
  dueInDays?: number;
  dependsOn?: string[];
};

/* ================= HELPERS ================= */

const isSTEM = (degree: string) =>
  degree.toLowerCase().includes("engineering") ||
  degree.toLowerCase().includes("computer") ||
  degree.toLowerCase().includes("science");

/* ================= TEMPLATES ================= */

export const TASK_TEMPLATES: TaskTemplate[] = [
  {
    id: "sop-final",
    category: "SOP",
    title: "Finalize Statement of Purpose",
    priority: 1,
    blocking: true,
    dueInDays: 14,
    requiredIf: (profile) =>
      profile.readiness.sop !== "READY",
  },

  {
    id: "ielts-submit",
    category: "TEST",
    title: "Submit IELTS Score",
    priority: 2,
    blocking: true,
    dueInDays: 21,
    requiredIf: (profile) =>
      isSTEM(profile.goals.targetDegree) &&
      profile.readiness.ielts !== "COMPLETED",
  },

  {
    id: "gre-report",
    category: "TEST",
    title: "Send GRE Official Report",
    priority: 3,
    dueInDays: 30,
    requiredIf: (profile) =>
      profile.goals.targetDegree
        .toLowerCase()
        .includes("computer") &&
      profile.readiness.gre !== "COMPLETED",
  },

  {
    id: "bank-proof",
    category: "FINANCE",
    title: "Prepare Bank Statement",
    priority: 2,
    blocking: true,
    dueInDays: 10,
    requiredIf: () => true,
  },

  {
    id: "application-fee",
    category: "PORTAL",
    title: "Pay Application Fee",
    priority: 1,
    blocking: true,
    dependsOn: ["bank-proof"],
    dueInDays: 7,
    requiredIf: () => true,
  },
];
