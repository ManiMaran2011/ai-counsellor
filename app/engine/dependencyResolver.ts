// app/engine/dependencyResolver.ts

import { Task } from "@/app/context/UserContext";

export type ResolvedTask = Task & {
  blocked: boolean;
  blockedBy?: string[];
};

export function resolveDependencies(tasks: Task[]): ResolvedTask[] {
  const completedTaskIds = new Set(
    tasks
      .filter((t) => t.status === "DONE")
      .map((t) => t.id)
  );

  return tasks.map((task) => {
    if (!task.dependsOn || task.dependsOn.length === 0) {
      return { ...task, blocked: false };
    }

    const unmet = task.dependsOn.filter(
      (depId) => !completedTaskIds.has(depId)
    );

    if (unmet.length > 0) {
      return {
        ...task,
        blocked: true,
        blockedBy: unmet,
      };
    }

    return { ...task, blocked: false };
  });
}
