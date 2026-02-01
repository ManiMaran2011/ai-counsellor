// app/engine/taskTemplates.ts

import type { Profile } from "@/app/context/UserContext";

/**
 * NOTE:
 * This file is intentionally minimal.
 * The current system generates tasks directly in taskEngine.ts.
 * Templates will be reintroduced later when dependency graphs are needed.
 */

export type TaskTemplate = {
  id: string;
  title: string;
  requiredIf: (profile: Profile) => boolean;
};

export const TASK_TEMPLATES: TaskTemplate[] = [
  {
    id: "sop",
    title: "Finalize Statement of Purpose",
    requiredIf: (profile) => {
      const readiness = profile.readiness ?? {};
      return !readiness.sop;
    },
  },
  {
    id: "ielts",
    title: "Submit English Test Score",
    requiredIf: (profile) => {
      const readiness = profile.readiness ?? {};
      return !readiness.ielts;
    },
  },
];
