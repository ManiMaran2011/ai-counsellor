// app/engine/taskEngine.ts

import { TASK_TEMPLATES } from "./taskTemplates";
import type { Profile, University, Task, RiskLevel } from "@/app/context/UserContext";

/* ================= RISK LOGIC ================= */

function inferTaskRisk(
  taskId: string,
  priority: number
): RiskLevel {
  // Blocking / submission-critical tasks
  if (priority <= 1) return "HIGH";

  // Important but not fatal
  if (priority === 2) return "MEDIUM";

  // Optional / late-stage tasks
  return "LOW";
}

/* ================= TASK GENERATION ================= */

export function generateTasks({
  profile,
  university,
  existingTasks = [],
}: {
  profile: Profile;
  university: University;
  existingTasks?: Task[];
}): Task[] {
  const tasks: Task[] = TASK_TEMPLATES
    .filter((tpl) => tpl.requiredIf(profile, university))
    .map((tpl) => {
      const existing = existingTasks.find(
        (t) => t.id === tpl.id
      );

      return {
        id: tpl.id,
        title: tpl.title,
        status: existing?.status ?? "NOT_STARTED",
        risk: inferTaskRisk(tpl.id, tpl.priority),
      };
    });

  // Lower priority number = higher urgency
  return tasks.sort((a, b) => {
    const pa =
      TASK_TEMPLATES.find((t) => t.id === a.id)?.priority ?? 99;
    const pb =
      TASK_TEMPLATES.find((t) => t.id === b.id)?.priority ?? 99;
    return pa - pb;
  });
}
