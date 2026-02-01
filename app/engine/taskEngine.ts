// app/engine/taskEngine.ts

import type { Profile, Task } from "@/app/context/UserContext";

/**
 * Generates base execution tasks
 * Defensive by design — onboarding data may be partial
 */
export function generateTasks(profile: Profile): Task[] {
  const tasks: Task[] = [];

  const readiness = profile.readiness ?? {
    ielts: "",
    gre: "",
    sop: "",
  };

  if (!readiness.sop) {
    tasks.push({
      id: "sop",
      title: "Finalize Statement of Purpose",
      status: "NOT_STARTED",
      risk: "HIGH",
    });
  }

  if (!readiness.ielts) {
    tasks.push({
      id: "ielts",
      title: "Submit English Test Score",
      status: "NOT_STARTED",
      risk: "MEDIUM",
    });
  }

  tasks.push({
    id: "application-fee",
    title: "Pay University Application Fee",
    status: "NOT_STARTED",
    risk: "HIGH",
  });

  return tasks;
}
