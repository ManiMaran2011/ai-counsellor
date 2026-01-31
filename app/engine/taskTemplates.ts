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
  priority: number;       // lower = higher priority
  blocking?: boolean;     // blocks submission if incomplete
  dueInDays?: number;     // used by risk engine
  dependsOn?: string[];   // task IDs
};

/* ================= TEMPLATES ================= */

export const TASK_TEMPLATES: TaskTemplate[] = [
  /* ================= SOP ================= */
  {
    id: "sop-final",
    category: "SOP",
    title: "Finalize Statement of Purpose",
    priority: 1,
    blocking: true,
    dueInDays: 14,
    requiredIf: (profile) => {
      return profile.readiness.sop !== "READY";
    },
  },

  /* ================= IELTS ================= */
  {
    id: "ielts-submit",
    category: "TEST",
    title: "Submit IELTS Score",
    priority: 2,
    blocking: true,
    dueInDays: 21,
    requiredIf: (profile, uni) => {
      if (!uni.program) return false;

      const requiresIELTS =
        uni.program.toLowerCase().includes("engineering") ||
        uni.program.toLowerCase().includes("science");

      return requiresIELTS && profile.readiness.ielts !== "COMPLETED";
    },
  },

  /* ================= GRE ================= */
  {
    id: "gre-report",
    category: "TEST",
    title: "Send GRE Official Report",
    priority: 3,
    blocking: false,
    dueInDays: 30,
    requiredIf: (profile, uni) => {
      if (!uni.program) return false;

      const requiresGRE =
        uni.program.toLowerCase().includes("computer") ||
        uni.program.toLowerCase().includes("engineering");

      return requiresGRE && profile.readiness.gre !== "COMPLETED";
    },
  },

  /* ================= FINANCE ================= */
  {
    id: "bank-proof",
    category: "FINANCE",
    title: "Prepare Bank Statement",
    priority: 2,
    blocking: true,
    dueInDays: 10,
    requiredIf: () => true, // always required
  },

  /* ================= APPLICATION ================= */
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
