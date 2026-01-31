// app/engine/taskEngine.ts

import { TASK_TEMPLATES } from "./taskTemplates";
import type { Profile, University, Task } from "@/app/context/UserContext";

export function generateTasks({
  profile,
  university,
  existingTasks = [],
}: {
  profile: Profile;
  university: University;
  existingTasks?: Task[];
}): Task[] {
  const tasks = TASK_TEMPLATES
    .filter((tpl) => tpl.requiredIf(profile, university))
    .map((tpl) => {
      const existing = existingTasks.find(
        (t) => t.id === tpl.id
      );

      return {
        id: tpl.id,
        title: tpl.title,
        category: tpl.category,
        priority: tpl.priority,
        status: existing?.status ?? "NOT_STARTED",
        dependsOn: tpl.dependsOn,
      };
    });

  return tasks.sort((a, b) => a.priority - b.priority);
}
