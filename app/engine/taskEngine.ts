// app/engine/taskEngine.ts

import { TASK_TEMPLATES } from "./taskTemplates";
import type {
  Profile,
  University,
  Task,
  RiskLevel,
} from "@/app/context/UserContext";

/* ================= RISK LOGIC ================= */

function inferTaskRisk(priority: number): RiskLevel {
  if (priority <= 1) return "HIGH";
  if (priority === 2) return "MEDIUM";
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
        category: tpl.category,           // ✅ FIX
        priority: tpl.priority,           // ✅ FIX
        status: existing?.status ?? "NOT_STARTED",
        risk: inferTaskRisk(tpl.priority), // ✅ FIX
      };
    });

  // Lower priority number = higher urgency
  return tasks.sort((a, b) => a.priority - b.priority);
}
